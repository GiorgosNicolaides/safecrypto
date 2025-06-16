// src/pages/cwe/CWE1230.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE1230: React.FC = () => {
  const bestPractices = [
    'Strip or sanitize all sensitive metadata (e.g., EXIF, file creation dates) from files before storage or sharing.',
    'Apply the same access controls and authorization checks to metadata endpoints or indexes as you do to the underlying data.',
    'Expose only minimal, non-sensitive metadata—omit user identifiers, location, or device information unless strictly necessary.',
    'Audit and monitor any metadata stores, search indices, or logs for inadvertent exposure of private details.',
    'Encrypt sensitive metadata fields at rest and in transit with the same rigor as the primary data.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Node.js using sharp to strip all metadata from images
import sharp from 'sharp';

async function stripMetadata(inputBuffer: Buffer): Promise<Buffer> {
  return await sharp(inputBuffer)
    .removeMetadata()              // drops EXIF, IPTC, and other metadata
    .toBuffer();
}`,

    `# ✅ Good: Python/Pillow removing EXIF before saving
from PIL import Image

def strip_exif(input_path: str, output_path: str):
    img = Image.open(input_path)
    data = list(img.getdata())
    clean = Image.new(img.mode, img.size)
    clean.putdata(data)            # reconstruct without any metadata
    clean.save(output_path)`,
    
    `// ✅ Good: Express.js limiting metadata response
app.get('/file/:id/metadata', authenticate, (req, res) => {
  const md = getMetadataForFile(req.params.id);
  // only expose non-sensitive fields
  res.json({
    filename: md.filename,
    uploadDate: md.uploadDate,
  });
});`
  ];

  const badPractices = [
    'Retaining full EXIF or other metadata when processing or serving user‐uploaded files.',
    'Returning all metadata fields via an API without filtering (including location, device, or user info).',
    'Using default library behavior that preserves metadata instead of explicitly stripping it.',
    'Assuming metadata cannot contain sensitive information and not treating it as protected data.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: sharp retains metadata by default
import sharp from 'sharp';

async function processImage(inputBuffer: Buffer): Promise<Buffer> {
  return await sharp(inputBuffer)
    .resize(800)
    .toBuffer();   // still includes all original metadata
}`,

    `# ❌ Bad: Pillow saving image without stripping EXIF
from PIL import Image

img = Image.open('photo.jpg')
img.save('photo_copy.jpg')       # EXIF metadata is preserved
`,

    `// ❌ Bad: exposing full metadata via API
app.get('/file/:id/metadata', (req, res) => {
  res.json(getMetadataForFile(req.params.id));  // leaks all sensitive fields
});`
  ];

  return (
    <BackgroundWrapper>
      <DoDontLayout
        left={
          <>
            <div style={{ textAlign: 'left', color: '#ffe81f' }}>
              <h3>✔️ Best Practices</h3>
              <ul>
                {bestPractices.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
            <Slideshow
              slides={goodCodeSamples.map((code, i) => (
                <pre
                  key={i}
                  style={{
                    background: '#222',
                    color: '#fff',
                    padding: '1rem',
                    borderRadius: '4px',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    width: '100%'
                  }}
                >
                  <code>{code}</code>
                </pre>
              ))}
            />
          </>
        }
        right={
          <>
            <div style={{ textAlign: 'left', color: '#ffe81f' }}>
              <h3>❌ Bad Practices</h3>
              <ul>
                {badPractices.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
            <Slideshow
              slides={badCodeSamples.map((code, i) => (
                <pre
                  key={i}
                  style={{
                    background: '#222',
                    color: '#fff',
                    padding: '1rem',
                    borderRadius: '4px',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    width: '100%'
                  }}
                >
                  <code>{code}</code>
                </pre>
              ))}
            />
          </>
        }
      />

      <section
        style={{
          maxWidth: 800,
          margin: '2rem auto',
          color: '#fff',
          fontFamily: 'sans-serif',
          lineHeight: 1.6
        }}
      >
        <h2 style={{ color: '#ffe81f', textAlign: 'center' }}>
          Understanding CWE-1230
        </h2>
        <p>
          CWE-1230, “Exposure of Sensitive Information Through Metadata,” occurs when an application
          correctly restricts access to primary data but fails to equally protect derived metadata—
          such as EXIF in images, search indices, or statistical reports—allowing attackers to infer
          or directly extract private details from those secondary sources :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2023-1974:</strong> The AnswerDev project (versions before 1.0.8) did not strip
            EXIF metadata from uploaded images, enabling extraction of location, device, and timestamp
            data from user photos :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2025-2424:</strong> In Mattermost’s `UpdateChannelBookmark()` routine (versions
            &lt;9.11.10-rc1, &lt;10.5.2), attackers could reference a deleted file and retrieve its
            underlying metadata—such as original filename and path—due to insufficient permission checks :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Treat metadata with the same confidentiality requirements as
          the underlying data—strip or sanitize sensitive fields, enforce authorization on metadata
          endpoints, limit exposed attributes to the bare minimum, and encrypt or audit metadata
          stores to prevent unintended disclosure.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE1230;
