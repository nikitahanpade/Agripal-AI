
import React, { useState } from 'react';
import {
  Camera, Upload, Leaf, AlertCircle, ShieldCheck,
  RotateCcw, Image as ImageIcon, Loader2
} from 'lucide-react';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CropDiseaseChecker: React.FC = () => {
  const [crop, setCrop] = useState('Tomato');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const symptomOptions = [
    'Yellow leaves',
    'Brown or black spots',
    'White powder on leaves',
    'Curling leaves',
    'Wilting plants',
    'Holes in leaves',
    'Rotting fruits or stems',
  ];

  const handleImage = (file?: File) => {
    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Please select a JPG, PNG or WEBP image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Please select an image smaller than 5 MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
      setImageFile(file);
      setAnalysis('');
      setError('');
    };

    reader.onerror = () => {
      setError('Unable to read the selected image.');
    };

    reader.readAsDataURL(file);
  };

  const toggleSymptom = (item: string) => {
    setSymptoms(current =>
      current.includes(item)
        ? current.filter(s => s !== item)
        : [...current, item]
    );

    setAnalysis('');
    setError('');
  };

  const handleAnalysis = async () => {
    if (!imageFile || !preview) {
      setError('Please upload a crop image first.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/crop-disease-check`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            crop,
            symptoms,
            imageBase64: preview,
            mimeType: imageFile.type,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Crop analysis failed. Please try again.'
        );
      }

      if (!data.analysis) {
        throw new Error('No analysis was received from AI.');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to connect to the server.';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCrop('Tomato');
    setSymptoms([]);
    setPreview(null);
    setImageFile(null);
    setAnalysis('');
    setError('');
    setLoading(false);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">

      {/* Header */}
      <section className="bg-gradient-to-r from-green-800 to-emerald-600 rounded-3xl p-8 md:p-10 text-white mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Leaf size={30} />
          </div>
          <span className="font-semibold text-green-100">
            AgriPal AI • Crop Care
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          AI Crop Disease Checker
        </h1>

        <p className="text-green-50 max-w-2xl leading-7">
          Upload a crop image and let AI examine visible plant symptoms
          to provide possible disease observations and preventive guidance.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Input Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Crop Details
          </h2>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Crop
          </label>

          <select
            value={crop}
            onChange={e => {
              setCrop(e.target.value);
              setAnalysis('');
              setError('');
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-7 focus:ring-2 focus:ring-green-500 outline-none"
          >
            {[
              'Tomato',
              'Rice',
              'Wheat',
              'Sugarcane',
              'Soybean',
              'Cotton',
              'Maize',
              'Groundnut',
              'Other',
            ].map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <h3 className="font-bold text-gray-800 mb-3">
            Upload Crop Image
          </h3>

          <label className="border-2 border-dashed border-green-300 rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer hover:bg-green-50 transition">
            {preview ? (
              <img
                src={preview}
                alt="Selected crop"
                className="w-full max-h-64 object-contain rounded-xl"
              />
            ) : (
              <>
                <div className="bg-green-100 text-green-700 p-4 rounded-full mb-3">
                  <Camera size={30} />
                </div>

                <span className="font-semibold text-gray-800">
                  Click to upload crop image
                </span>

                <span className="text-sm text-gray-500 mt-2">
                  JPG, PNG or WEBP • Maximum 5 MB
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={e => {
                handleImage(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </label>

          <h3 className="font-bold text-gray-800 mt-7 mb-3">
            Select Visible Symptoms
          </h3>

          <div className="grid sm:grid-cols-2 gap-3">
            {symptomOptions.map(item => (
              <label
                key={item}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  symptoms.includes(item)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={symptoms.includes(item)}
                  onChange={() => toggleSymptom(item)}
                  className="accent-green-600"
                />

                <span className="text-sm text-gray-700">
                  {item}
                </span>
              </label>
            ))}
          </div>

          <button
            type="button"
            disabled={!imageFile || loading}
            onClick={handleAnalysis}
            className="w-full mt-8 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing Crop Image...
              </>
            ) : (
              <>
                <Upload size={19} />
                Analyze Crop with AI
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <RotateCcw size={17} />
            Reset
          </button>
        </section>

        {/* Result Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            AI Plant Health Analysis
          </h2>

          {!analysis && !loading && !error && (
            <div className="min-h-80 flex flex-col items-center justify-center text-center">
              <div className="bg-green-50 p-6 rounded-full mb-5">
                <ImageIcon size={42} className="text-green-600" />
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Ready to Analyze Your Crop?
              </h3>

              <p className="text-gray-500 max-w-sm leading-6">
                Upload a clear crop image and click Analyze Crop with AI.
                Your analysis will appear here.
              </p>
            </div>
          )}

          {loading && (
            <div className="min-h-80 flex flex-col items-center justify-center text-center">
              <Loader2
                size={48}
                className="text-green-600 animate-spin mb-5"
              />

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                AI Is Examining Your Crop
              </h3>

              <p className="text-gray-500">
                Please wait while the image is being analyzed.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
                <AlertCircle size={21} />
                Analysis Error
              </div>

              <p className="text-sm text-red-700 leading-6">
                {error}
              </p>
            </div>
          )}

          {analysis && (
            <div className="space-y-5">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-center gap-2 text-green-800 font-bold mb-3">
                  <ShieldCheck size={22} />
                  AI Analysis Result
                </div>

                <div className="text-sm text-gray-700 leading-7 whitespace-pre-wrap">
                  {analysis}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
                  <AlertCircle size={20} />
                  Important Note
                </div>

                <p className="text-sm text-amber-900 leading-6">
                  AI results are preliminary observations, not a
                  guaranteed diagnosis. Consult an agricultural expert
                  or local KVK before applying any treatment.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      <p className="text-xs text-gray-500 mt-6 text-center">
        AI-generated crop health guidance may not always be accurate.
        Always verify disease identification with an agricultural expert.
      </p>
    </main>
  );
};

export default CropDiseaseChecker;
