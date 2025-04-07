'use client'
import Chatbot from '@/components/ui/live/chatbot';
import FieldInput from '@/components/ui/input/field-input';
import { useState } from 'react';

function Page() {
  const [link, setLink] = useState('');
  return (
    <div className="register-container">
      <FieldInput id="website-link" name="website-link" type="text" label="Website Link" placeholder="Enter website URL" required onChange={(e) => setLink(e.target.value)} aria-label={''} data-testid={''} />
      {link && <iframe src={link} title="Website Preview" height={'800px'} width={'100%'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>}
      <Chatbot link={link} />
    </div>
  );
}

export default Page;