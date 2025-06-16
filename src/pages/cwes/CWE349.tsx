// src/pages/cwe/CWE349.tsx
import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import DoDontLayout from '../../components/DoDontLayout';
import Slideshow from '../../components/Slideshow';

const CWE349: React.FC = () => {
  const bestPractices = [
    'Validate untrusted input against a strict schema that forbids additional properties (e.g., JSON Schema with `additionalProperties: false`, Joi `.unknown(false)`).',
    'Separate processing of trusted and untrusted data—do not merge external input directly into trusted objects.',
    'Whitelist allowed fields explicitly when combining configuration or payloads, ignoring any extraneous properties.',
    'Use strong input-validation libraries (Joi, AJV, Pydantic) configured to reject unknown or unsafe data by default.',
    'Log and fail securely on detection of unexpected fields, alerting to possible injection or poisoning attempts.'
  ];

  const goodCodeSamples = [
    `// ✅ Good: Express.js with Joi schema rejecting unknown properties
import Joi from 'joi';
import express from 'express';

const app = express();
app.use(express.json());

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
}).unknown(false);  // forbids any extraneous fields

app.post('/users', (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  // only username & email are present
  createUser(value);
  res.sendStatus(201);
});`,

    `# ✅ Good: Python FastAPI with Pydantic model forbidding extra data
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Extra

class User(BaseModel):
    username: str
    email: str

    class Config:
        extra = Extra.forbid  # reject any additional fields

app = FastAPI()

@app.post("/users")
async def create_user(user: User):
    return {"username": user.username, "email": user.email}`
  ];

  const badPractices = [
    'Merging untrusted `req.query`, `req.body`, or other inputs directly into trusted objects without filtering.',
    'Using permissive validation (e.g., JSON Schema `additionalProperties: true`) that allows arbitrary fields.',
    'Relying on simple property checks and then spreading the whole object, unintentionally including extras.',
    'Treating untrusted payloads as trusted after initial parsing, without a second integrity check.',
    'Logging or acting on unvalidated fields, enabling attackers to sneak in malicious data.'
  ];

  const badCodeSamples = [
    `// ❌ Bad: blindly merging query params into configuration
import express from 'express';
const app = express();

app.get('/config', (req, res) => {
  const defaultConfig = { timeout: 5000, retries: 3 };
  // attacker can add ?isAdmin=true or other fields
  const config = { ...defaultConfig, ...req.query };
  initializeService(config);
  res.send(config);
});`,

    `# ❌ Bad: Python YAML loader trusting extraneous keys
import yaml

with open('trusted_config.yaml') as f:
    cfg = yaml.safe_load(f)  # attacker-supplied file can include extra keys
# blindly update application settings
app_settings.update(cfg)`
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
          Understanding CWE-349
        </h2>
        <p>
          CWE-349, “Acceptance of Extraneous Untrusted Data With Trusted Data,” occurs when a product,
          while processing trusted data, also accepts untrusted data bundled with it and treats it as
          if it were trusted. This can lead to bypassing protection mechanisms or corrupting application
          state when unexpected fields or values are injected :contentReference[oaicite:0].
        </p>
        <h3 style={{ color: '#ffe81f' }}>Real-World CVE Examples</h3>
        <ul style={{ listStyle: 'disc inside' }}>
          <li>
            <strong>CVE-2024-46982:</strong> A vulnerability in the Next.js framework (versions ≥13.5.1 &
            {'<'}14.0.0 {'<'}14.2.10) allowed cache-poisoning by sending crafted HTTP requests that included
            extraneous query parameters, treating them as part of a trusted route configuration :contentReference[oaicite:1].
          </li>
          <li>
            <strong>CVE-2024-52555:</strong> JetBrains WebStorm before 2024.3.0 executed arbitrary
            code in “Untrusted Project” mode by accepting extra untrusted type-definition data in an
            installer script, bypassing the intended trust boundary :contentReference[oaicite:2].
          </li>
        </ul>
        <p>
          <strong>Remediation:</strong> Enforce strict schema validation that forbids unknown fields,
          whitelist permitted properties when merging untrusted input, and segregate trusted data
          from any external sources. Log and reject any payloads containing unexpected data.
        </p>
      </section>
    </BackgroundWrapper>
  );
};

export default CWE349;
