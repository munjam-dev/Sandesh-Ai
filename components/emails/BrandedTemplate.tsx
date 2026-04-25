import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface BrandedTemplateProps {
  businessName: string;
  subject: string;
  content: string;
}

export const BrandedTemplate = ({
  businessName = 'Sandesh AI',
  subject = 'Your latest update',
  content = 'Hello there, check out our new features!',
}: BrandedTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>{businessName}</Text>
          </Section>
          
          <Section style={contentSection}>
            <Heading style={heading}>{subject}</Heading>
            
            {/* We render the AI generated HTML content here */}
            <div 
              style={text}
              dangerouslySetInnerHTML={{ __html: content }} 
            />
            
            <Section style={buttonContainer}>
              <Button style={button} href="https://sandesh-ai.vercel.app">
                Take Action
              </Button>
            </Section>
          </Section>
          
          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} {businessName}. All rights reserved.
            </Text>
            <Text style={footerText}>
              If you have any questions, reply to this email or contact us at sandesh.ai.info@gmail.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BrandedTemplate;

const main = {
  backgroundColor: '#050505',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#0A0A0A',
  border: '1px solid #1A1A1A',
  borderRadius: '12px',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  overflow: 'hidden',
};

const header = {
  background: 'linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const logoText = {
  color: '#FFFFFF',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '1px',
};

const contentSection = {
  padding: '40px',
};

const heading = {
  color: '#FFFFFF',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
};

const text = {
  color: '#A1A1AA',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 30px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '30px',
  marginBottom: '10px',
};

const button = {
  backgroundColor: '#0066FF',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const hr = {
  borderColor: '#1A1A1A',
  margin: '0',
};

const footer = {
  padding: '30px 40px',
  backgroundColor: '#080808',
};

const footerText = {
  color: '#52525B',
  fontSize: '12px',
  lineHeight: '18px',
  textAlign: 'center' as const,
  margin: '0 0 10px 0',
};
