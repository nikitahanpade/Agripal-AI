import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../api';
import {
  Sprout,
  AlertTriangle,
  Cloud,
  ArrowLeft,
  RefreshCw,
  MapPin,
  Droplets,
  Leaf,
  Database,
  Info,
  FlaskConical,
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface CropRecommendationItem {
  regionType?: string;
  typicalSoilGroups?: string;
  seasonalCandidateCrops?: string;
  districtMajorCrops?: string;
  waterGuidance?: string;
  recommendationStatus?: string;
}

interface CropRecommendationResponse {
  success: boolean;
  source?: string;
  state?: string;
  district?: string;
  season?: string;
  recommendations?: CropRecommendationItem[];
  advisory?: string;
  message?: string;
  error?: string;
}

const Recommendation: React.FC = () => {
  const { user, formData } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [result, setResult] =
    useState<CropRecommendationResponse | null>(null);

  const data = formData as
    | (NonNullable<typeof formData> & {
        state?: string;
        district?: string;
        season?: string;
      })
    | null;

  const state =
    data?.state || data?.location?.split(' - ')[0] || '';

  const district =
    data?.district || data?.location?.split(' - ')[1] || '';

  const season = data?.season || '';

  useEffect(() => {
    if (!user || !formData) {
      navigate('/register');
      return;
    }

    if (!state || !district || !season) {
      setError(
        'State, district, or season is missing. Please return to the input form and select all required fields.'
      );
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchRecommendations = async () => {
      setLoading(true);
      setError('');
      setResult(null);

      try {
        const params = new URLSearchParams({
          state,
          district,
          season,
        });

        const response = await fetch(
          apiUrl(`/api/crop-recommendations?${params.toString()}`),
          { signal: controller.signal }
        );

        const responseData: CropRecommendationResponse =
          await response.json();

        if (!response.ok || !responseData.success) {
          throw new Error(
            responseData.message ||
              responseData.error ||
              (state.toLowerCase() !== 'maharashtra'
                ? 'The current crop reference dataset supports Maharashtra only.'
                : 'Unable to load crop recommendations.')
          );
        }

        setResult(responseData);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong while loading recommendations.'
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchRecommendations();

    return () => controller.abort();
  }, [user, formData, navigate, state, district, season]);

  if (!user || !formData) {
    return null;
  }

  const crop = result?.recommendations?.[0];

  const cropNames = crop?.seasonalCandidateCrops
    ? crop.seasonalCandidateCrops
        .split(';')
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sprout className="h-4 w-4" />
          AgriPal AI Crop Advisor
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Crop Recommendations
        </h1>

        <p className="text-gray-600">
          Hello {user.name}, here is the regional crop reference for your
          selected farm location.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-2">
            <MapPin className="h-4 w-4 text-green-600" />
            {district || 'District not selected'}, {state}
          </span>

          <span className="bg-white border border-gray-200 rounded-full px-3 py-2">
            Season: {season || 'Not selected'}
          </span>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6" />

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Loading Crop Recommendations
          </h2>

          <p className="text-gray-600">
            Fetching regional crop data from the AgriPal backend...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Unable to Load Recommendations
          </h2>

          <p className="text-gray-600 mb-6">{error}</p>

          <p className="text-sm text-gray-500 mb-6">
            Make sure the backend server is running on port 5000 and that
            your selected district and season are available in the dataset.
          </p>

          <button
            onClick={() => navigate('/input')}
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Modify Input
          </button>
        </div>
      )}

      {!loading && !error && result && (
        <>
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-3xl p-8 md:p-10 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/15 rounded-2xl p-4">
                <Sprout className="h-10 w-10" />
              </div>

              <div>
                <p className="text-green-100 mb-1">
                  Regional Candidate Crops
                </p>

                <h2 className="text-2xl md:text-3xl font-bold">
                  {district} · {season}
                </h2>
              </div>
            </div>

            {cropNames.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cropNames.map((cropName, index) => (
                  <div
                    key={`${cropName}-${index}`}
                    className="bg-white/10 border border-white/20 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-3">
                      <Leaf className="h-6 w-6 text-green-100 shrink-0" />
                      <h3 className="text-lg font-semibold">{cropName}</h3>
                    </div>
                    <p className="text-green-100 text-sm mt-3">
                      Regional candidate for further suitability checking
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-50">
                No crop candidates were listed for this selection.
              </p>
            )}

            {crop?.regionType && (
              <p className="text-green-100 mt-6">
                Region: {crop.regionType}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FlaskConical className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Soil Reference
                </h3>
              </div>

              <p className="text-gray-600 mb-3">
                <span className="font-semibold text-gray-900">
                  Selected soil:
                </span>{' '}
                {data?.soilType || 'Not provided'}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  Typical regional soil groups:
                </span>{' '}
                {crop?.typicalSoilGroups ||
                  'No soil reference is available for this record.'}
              </p>

              <p className="text-sm text-gray-500 mt-4">
                Regional soil information does not replace a soil test.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Water Guidance
                </h3>
              </div>

              <p className="text-gray-600 mb-4">
                {crop?.waterGuidance ||
                  'Check local rainfall, irrigation availability, drainage, and field moisture before planting.'}
              </p>

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="font-semibold text-blue-900">
                  Your water availability
                </p>
                <p className="text-blue-800 mt-1">
                  {data?.waterAvailability || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Dataset Information
                </h3>
              </div>

              <p className="text-gray-600 mb-3">
                <span className="font-semibold text-gray-900">Source:</span>{' '}
                {result.source || 'AgriPal Crop Reference Dataset'}
              </p>

              {crop?.districtMajorCrops && (
                <p className="text-gray-600 mb-3">
                  <span className="font-semibold text-gray-900">
                    Regional major crops:
                  </span>{' '}
                  {crop.districtMajorCrops}
                </p>
              )}

              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  Record status:
                </span>{' '}
                {crop?.recommendationStatus ||
                  'Regional reference; verify locally before planting.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="h-6 w-6 text-sky-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Farm Details
                </h3>
              </div>

              <div className="space-y-3 text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">Budget:</span>{' '}
                  {data?.budget || 'Not provided'}
                </p>

                <p>
                  <span className="font-semibold text-gray-900">
                    Temperature:
                  </span>{' '}
                  {data?.temperature !== undefined
                    ? `${data.temperature} °C`
                    : 'Not provided'}
                </p>

                <p>
                  <span className="font-semibold text-gray-900">Soil pH:</span>{' '}
                  {data?.ph !== undefined ? data.ph : 'Not provided'}
                </p>

                <p>
                  <span className="font-semibold text-gray-900">Humidity:</span>{' '}
                  {data?.humidity !== undefined
                    ? `${data.humidity}%`
                    : 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-amber-700 shrink-0 mt-0.5" />

              <div>
                <h3 className="font-semibold text-amber-900 mb-2">
                  Important Agricultural Advisory
                </h3>

                <p className="text-amber-900">
                  {result.advisory ||
                    'These are regional candidate crops, not guaranteed recommendations. Confirm soil suitability with a soil test and current local agricultural guidance before planting.'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={() => navigate('/input')}
          className="flex items-center justify-center px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Modify Input
        </button>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Refresh Recommendations
        </button>

        <button
          onClick={() => navigate('/')}
          className="flex-1 flex items-center justify-center px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
};

export default Recommendation;