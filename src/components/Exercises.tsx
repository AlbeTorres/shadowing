import { useAudioState } from "@/store/AudioState";

export const Exercises=()=>{

    const { exercises } = useAudioState();

    if (!exercises || (exercises.grammar.length === 0 && exercises.writing.length === 0)) {
        return null; // If no exercises, don't render anything
    }

    return(
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📝 Ejercicios Generados
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Grammar Exercises */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  📚 Gramática
                </h3>
                {exercises.grammar.map((exercise, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="font-medium text-gray-800 mb-3">
                      {index + 1}. {exercise.question}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {exercise.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          className="text-left p-2 rounded bg-white hover:bg-blue-50 border transition-colors"
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Writing Exercises */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  ✍️ Escritura
                </h3>
                {exercises.writing.map((exercise, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="font-medium text-gray-800 mb-3">
                      {index + 1}. {exercise.prompt}
                    </p>
                    <textarea
                      className="w-full h-24 p-3 border rounded-lg resize-none"
                      placeholder="Escribe tu respuesta aquí..."
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Mínimo {exercise.minWords} palabras
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
    );
}