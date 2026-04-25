import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { google } from 'googleapis'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const userId = searchParams.get('state') // Passed from /api/auth/gmail
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(new URL(`/settings?error=${error}`, request.url))
  }

  if (!code || !userId) {
    return NextResponse.redirect(new URL('/settings?error=invalid_callback', request.url))
  }

  const supabase = await createClient()

  // Verify the user who started the flow is the one finishing it
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.id !== userId) {
    return NextResponse.redirect(new URL('/settings?error=unauthorized', request.url))
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )

  try {
    const { tokens } = await oauth2Client.getToken(code)
    
    // We only care about the refresh token for long-term access
    if (tokens.refresh_token) {
      const { error: updateError } = await supabase
        .from('integrations')
        .upsert({
          user_id: user.id,
          provider: 'gmail',
          refresh_token: tokens.refresh_token,
        }, { onConflict: 'user_id,provider' })

      if (updateError) {
        console.error('Error saving refresh token:', updateError)
        return NextResponse.redirect(new URL('/settings/channels?error=db_error', request.url))
      }
    }

    return NextResponse.redirect(new URL('/settings/channels?gmail=connected', request.url))
  } catch (err) {
    console.error('Error exchanging token:', err)
    return NextResponse.redirect(new URL('/settings/channels?error=token_exchange_failed', request.url))
  }
}
