export const verifyEnvVar = (varName: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`Environment variable ${varName} is not set`);
  }

  return value;
};

export const envVars = {
  privyAppId: verifyEnvVar(
    "NEXT_PUBLIC_PRIVY_APP_ID",
    process.env.NEXT_PUBLIC_PRIVY_APP_ID
  ),
  alchemyApiKey: verifyEnvVar(
    "NEXT_PUBLIC_ALCHEMY_API_KEY",
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  ),
  zeroDevId: verifyEnvVar(
    "NEXT_PUBLIC_ZERODEV_ID",
    process.env.NEXT_PUBLIC_ZERODEV_ID
  ),
  isTestNetwork:
    process.env.NEXT_PUBLIC_IS_TEST_NETWORK?.toLowerCase() === "true",
  apiEndpoint: verifyEnvVar(
    "NEXT_PUBLIC_API_ENDPOINT",
    process.env.NEXT_PUBLIC_API_ENDPOINT
  ),
  etherspotApi: verifyEnvVar(
    "NEXT_PUBLIC_ETHERSPOT_API",
    process.env.NEXT_PUBLIC_ETHERSPOT_API
  ),
  // Add other environment variables here as needed
};
