import * as Lambda  from 'aws-cdk-lib/aws-lambda';


const safeLambdaRuntimes: Lambda.Runtime[] = [
  Lambda.Runtime.NODEJS_18_X,
  Lambda.Runtime.NODEJS_20_X,
  Lambda.Runtime.PYTHON_3_8,
  Lambda.Runtime.PYTHON_3_9,
  Lambda.Runtime.PYTHON_3_10,
  Lambda.Runtime.PYTHON_3_11,
  Lambda.Runtime.PYTHON_3_12,
  Lambda.Runtime.JAVA_8_CORRETTO,
  Lambda.Runtime.JAVA_11,
  Lambda.Runtime.JAVA_17,
  Lambda.Runtime.JAVA_21,
  Lambda.Runtime.DOTNET_6,
  Lambda.Runtime.DOTNET_8,
  Lambda.Runtime.RUBY_3_2,
  Lambda.Runtime.RUBY_3_3,
  Lambda.Runtime.PROVIDED_AL2,
  Lambda.Runtime.PROVIDED_AL2023,
  Lambda.Runtime.FROM_IMAGE,
];

class LoggedError extends Error {
  constructor(message: string) {
      super(message);
      this.name = "LoggedError";
      LoggedError.logError(this);
      if (true){
        console.log(message)
      }else{
        throw this
      }

  }

  // Statische Methode zum Protokollieren von Fehlern
  static logError(error: Error) {
      console.error("An error occurred:");
      // ErrorHandler.errors.push(error); // Fehlerliste aktualisieren
  }
}

export const checkRuntime = (runtime: Lambda.Runtime): Lambda.Runtime => {
  if (!safeLambdaRuntimes.includes(runtime)) {
      throw new LoggedError("Not a valid and secured runtime: " + runtime);
  }
  return runtime;
};

(async () => {
  try {
      const runtime = await checkRuntime(Lambda.Runtime.NODEJS_18_X);
      console.log("Valid runtime:", runtime); // Gibt die Runtime zurück
  } catch (error) {
      console.error("Caught error:", error); // Fehlerbehandlung
  }

  const invalidRuntime = await checkRuntime(Lambda.Runtime.NODEJS_16_X);
  console.log("Invalid runtime:", invalidRuntime); // Gibt null zurück

  //console.log("Logged errors:", ErrorHandler.errors); // Zeigt die Liste der protokollierten Fehler
})();