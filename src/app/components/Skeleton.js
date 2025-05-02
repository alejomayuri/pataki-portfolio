export default function Skeleton({ type = "about" }) {
    return (
      <div className="max-w-sm mx-auto animate-pulse">
        {type === "about" && (
          <>
            <div className="h-64 bg-gray-200 rounded-xl mb-4" />
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/2 mx-auto" />
            <div className="flex justify-center gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
              ))}
            </div>
          </>
        )}
  
        {type === "fotos" && (
          <>
            <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-8" />
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-32 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
  
        {type === "contacto" && (
          <>
            {/* Imagen y título */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full shadow-md" />
            </div>
            <div className="h-5 w-1/2 bg-gray-200 rounded mx-auto mb-6" />
  
            {/* Íconos sociales */}
            <div className="flex justify-center gap-6 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-7 h-7 bg-gray-200 rounded-full" />
              ))}
            </div>
  
            {/* Grupos de enlaces */}
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="mb-8">
                <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-14 bg-gray-200 rounded shadow-md"
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
  