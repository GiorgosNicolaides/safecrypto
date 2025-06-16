// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Encryption from './pages/encryption/Encryption';
import Algorithms from './pages/algorithms/Algorithms';
import Authentication from './pages/authentication/Authentication';
import DataIntegrity from './pages/data-integrity/DataIntegrity';
import Randomness from './pages/randomness/Randomness';
import SensitiveInfo from './pages/data-exposure/SensitiveInfo';
import Certificates from './pages/certificates/Certificates';
import KeyManagement from './pages/key_mgmt/KeyManagement';
import WeakEncryption from './pages/encryption/WeakEncryption';
import CleartextTransmission from './pages/encryption/CleartextTransmission';
import HardcodedKeys from './pages/key_mgmt/HardcodedKeys';
import PasswordManagement from './pages/key_mgmt/PasswordManagement';
import WeakKeyManagement from './pages/key_mgmt/WeakKeyManagement';
import AlgorithmDowngrade from './pages/algorithms/AlgorithmicDowngrade';
import EncryptionWithoutIntegrity from './pages/data-integrity/EncryptionWithoutIntegrity';
import MissingWeakChecks from './pages/data-integrity/MissingWeakChecks';
import ExposureThroughApplication from './pages/data-exposure/ExposureThroughApplication';
import IndirectLeakage from './pages/data-exposure/IndirectLeakage';
import InsecureStorage from './pages/data-exposure/InsecureStorage';
import InsufficientRandomness from './pages/randomness/InsufficientRandomness';
import PredictableSeeds from './pages/randomness/PredictableSeeds';
import ImproperValidation from './pages/certificates/ImproperValidation';
import MismanagementTrustChains from './pages/certificates/MismanagementTrustChains';
import WeakAuthentication from './pages/authentication/WeakAuthentication';
import WeakCredentialManagement from './pages/authentication/WeakCredentialManagement';
import CWE256 from './pages/cwes/CWE256';
import CWE257 from './pages/cwes/CWE257';
import CWE327 from './pages/cwes/CWE327';
import CWE319 from './pages/cwes/CWE319';
import CWE5 from './pages/cwes/CWE5';
import CWE311 from './pages/cwes/CWE311';
import CWE325 from './pages/cwes/CWE325';
import CWE326 from './pages/cwes/CWE326';
import CWE328 from './pages/cwes/CWE328';
import CWE370 from './pages/cwes/CWE370';
import CWE523 from './pages/cwes/CWE523';
import CWE549 from './pages/cwes/CWE549';
import CWE321 from './pages/cwes/CWE321';
import CWE798 from './pages/cwes/CWE798';
import CWE1392 from './pages/cwes/CWE1392';
import CWE1394 from './pages/cwes/CWE1394';
import CWE258 from './pages/cwes/CWE258';
import CWE260 from './pages/cwes/CWE260';
import CWE324 from './pages/cwes/CWE324';
import CWE322 from './pages/cwes/CWE322';
import CWE329 from './pages/cwes/CWE329';
import CWE1204 from './pages/cwes/CWE1204';
import CWE522 from './pages/cwes/CWE522';
import CWE261 from './pages/cwes/CWE261';
import CWE555 from './pages/cwes/CWE555';
import CWE13 from './pages/cwes/CWE13';
import CWE262 from './pages/cwes/CWE262';
import CWE263 from './pages/cwes/CWE263';
import CWE312 from './pages/cwes/CWE312';
import CWE313 from './pages/cwes/CWE313';
import CWE314 from './pages/cwes/CWE314';
import CWE318 from './pages/cwes/CWE318';
import CWE526 from './pages/cwes/CWE526';
import CWE315 from './pages/cwes/CWE315';
import CWE316 from './pages/cwes/CWE316';
import CWE317 from './pages/cwes/CWE317';
import CWE1230 from './pages/cwes/CWE1230';
import CWE1258 from './pages/cwes/CWE1258';
import CWE1420 from './pages/cwes/CWE1420';
import CWE1421 from './pages/cwes/CWE1421';
import CWE1422 from './pages/cwes/CWE1422';
import CWE1423 from './pages/cwes/CWE1423';
import CWE302 from './pages/cwes/CWE302';
import CWE303 from './pages/cwes/CWE303';
import CWE304 from './pages/cwes/CWE304';
import CWE640 from './pages/cwes/CWE640';
import CWE916 from './pages/cwes/CWE916';
import CWE836 from './pages/cwes/CWE836';
import CWE1390 from './pages/cwes/CWE1390';
import CWE593 from './pages/cwes/CWE593';
import CWE353 from './pages/cwes/CWE353';
import CWE354 from './pages/cwes/CWE354';
import CWE1239 from './pages/cwes/CWE1239';
import CWE759 from './pages/cwes/CWE759';
import CWE760 from './pages/cwes/CWE760';
import CWE649 from './pages/cwes/CWE649';
import CWE323 from './pages/cwes/CWE323';
import CWE347 from './pages/cwes/CWE347';
import CWE349 from './pages/cwes/CWE349';
import CWE757 from './pages/cwes/CWE757';
import CWE780 from './pages/cwes/CWE780';




export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/encryption" element={<Encryption />} />
      <Route path="/encryption/weak-encryption" element={<WeakEncryption />} />
      <Route path="/encryption/cleartext-transmission" element={<CleartextTransmission />} />


      <Route path="/algorithms" element={<Algorithms />} />
      <Route path="/algorithms/algorithm-downgrade" element={<AlgorithmDowngrade />} />


      <Route path="/authentication" element={<Authentication />} />
      <Route path="/authentication/weak-authentication" element={<WeakAuthentication />} />
      <Route path="/authentication/weak-credential-management" element={<WeakCredentialManagement />} />

      <Route path="/data-integrity" element={<DataIntegrity />} />
      <Route path="/data-integrity/encryption-without-checks" element={<EncryptionWithoutIntegrity />} />
      <Route path="/data-integrity/missing-weak-checks" element={<MissingWeakChecks />} />

      <Route path="/randomness" element={<Randomness />} />
      <Route path="/randomness/insufficient-randomness" element={<InsufficientRandomness />} />
      <Route path="/randomness/predictable-seeds" element={<PredictableSeeds />} />

      <Route path="/data-exposure" element={<SensitiveInfo />} />
      <Route path="/data-exposure/exposure-through-application" element={<ExposureThroughApplication />} />
      <Route path="/data-exposure/indirect-leakage" element={<IndirectLeakage />} />
      <Route path="/data-exposure/insecure-storage" element={<InsecureStorage />} />

      <Route path="/certificates" element={<Certificates />} />
      <Route path="/certificates/improper-validation" element={<ImproperValidation />} />
      <Route path="/certificates/mismanagement-trust-chains" element={<MismanagementTrustChains />} />

      <Route path="/key-management" element={<KeyManagement />} />
      <Route path="/key-management/weak-key-management" element={<WeakKeyManagement />} />
      <Route path="/key-management/hardcoded-keys" element={<HardcodedKeys />} />
      <Route path="/key-management/password-management" element={<PasswordManagement />} />

      <Route path="/cwe-256" element={<CWE256 />} />
      <Route path="/cwe-257" element={<CWE257 />} />
      <Route path="/cwe-327" element={<CWE327 />} />
      <Route path="/cwe-319" element={<CWE319 />} />
      <Route path="/cwe-5" element={<CWE5 />} />
      <Route path="/cwe-311" element={<CWE311 />} />
      <Route path="/cwe-325" element={<CWE325 />} />
      <Route path="/cwe-326" element={<CWE326 />} />
      <Route path="/cwe-328" element={<CWE328 />} />
      <Route path="/cwe-370" element={<CWE370 />} />
      <Route path="/cwe-523" element={<CWE523 />} />
      <Route path="/cwe-549" element={<CWE549 />} />
      <Route path="/cwe-321" element={<CWE321 />} />
      <Route path="/cwe-798" element={<CWE798 />} />
      <Route path="/cwe-1392" element={<CWE1392 />} />
      <Route path="/cwe-1394" element={<CWE1394 />} />
      <Route path="/cwe-258" element={<CWE258 />} />
      <Route path="/cwe-260" element={<CWE260 />} />
      <Route path="/cwe-324" element={<CWE324 />} />
      <Route path="/cwe-322" element={<CWE322 />} />
      <Route path="/cwe-329" element={<CWE329 />} />
      <Route path="/cwe-1204" element={<CWE1204 />} />
      <Route path="/cwe-522" element={<CWE522 />} />
      <Route path="/cwe-261" element={<CWE261 />} />
      <Route path="/cwe-555" element={<CWE555 />} />
      <Route path="/cwe-13" element={<CWE13 />} />
      <Route path="/cwe-262" element={<CWE262 />} />
      <Route path="/cwe-263" element={<CWE263 />} />
      <Route path="/cwe-312" element={<CWE312 />} />
      <Route path="/cwe-313" element={<CWE313 />} />
      <Route path="/cwe-314" element={<CWE314 />} />
      <Route path="/cwe-318" element={<CWE318 />} />
      <Route path="/cwe-526" element={<CWE526 />} />
      <Route path="/cwe-315" element={<CWE315 />} />
      <Route path="/cwe-316" element={<CWE316 />} />
      <Route path="/cwe-317" element={<CWE317 />} />
      <Route path="/cwe-1230" element={<CWE1230 />} />
      <Route path="/cwe-1258" element={<CWE1258 />} />
      <Route path="/cwe-1420" element={<CWE1420 />} />
      <Route path="/cwe-1421" element={<CWE1421 />} />  
      <Route path="/cwe-1422" element={<CWE1422 />} />
      <Route path="/cwe-1423" element={<CWE1423 />} />
      <Route path="/cwe-302" element={<CWE302 />} />
      <Route path="/cwe-303" element={<CWE303 />} />
      <Route path="/cwe-304" element={<CWE304 />} />
      <Route path="/cwe-640" element={<CWE640 />} />
      <Route path="/cwe-916" element={<CWE916 />} />
      <Route path="/cwe-836" element={<CWE836 />} />
      <Route path="/cwe-1390" element={<CWE1390 />} />
      <Route path="/cwe-593" element={<CWE593 />} />
      <Route path="/cwe-353" element={<CWE353 />} />
      <Route path="/cwe-354" element={<CWE354 />} />
      <Route path="/cwe-1239" element={<CWE1239 />} />
      <Route path="/cwe-759" element={<CWE759 />} />
      <Route path="/cwe-760" element={<CWE760 />} />
      <Route path="/cwe-649" element={<CWE649 />} />
      <Route path="/cwe-323" element={<CWE323 />} />
      <Route path="/cwe-347" element={<CWE347 />} />
      <Route path="/cwe-349" element={<CWE349 />} />
      <Route path="/cwe-757" element={<CWE757 />} />
      <Route path="/cwe-780" element={<CWE780 />} />

      
      
     
    </Routes>
  );
}
