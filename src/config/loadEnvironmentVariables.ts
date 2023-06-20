import * as joi from 'joi';

export function loadEnvironmentVariables() {
  const envVarsSchema = joi.object()
    .keys({
      PORT: joi.number().positive().required(),
      MONGO_URI: joi.string().required(),
    })
    .unknown();

  const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    port: envVars.PORT,
    mongoUri: envVars.MONGO_URI,
  };
}
