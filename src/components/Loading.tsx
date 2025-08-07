type LoadingProps = {
  message: string;
  loading: boolean;
};

export const Loanding = ({message, loading}:LoadingProps) => {

  if (!loading) return null; // If not loading, don't render anything
  
  return( <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">{message}</p>
          </div>
          ) }