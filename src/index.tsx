import {
  DatadogProvider,
  DatadogProviderConfiguration,
  SdkVerbosity,
} from '@datadog/mobile-react-native';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  config: {
    applicationId: string;
    clientToken: string;
    env: string;
  };
};

const KfProvider = ({ children, config }: Props) => {
  const { applicationId, clientToken, env } = config;
  const ddConfig = new DatadogProviderConfiguration(
    clientToken,
    env,
    applicationId,
    true, // track user interactions (such as a tap on buttons).
    true, // track XHR resources
    true // track errors
  );

  ddConfig.site = 'US5';
  // Optional: Enable or disable native crash reports
  ddConfig.nativeCrashReportEnabled = true;
  // Optional: Sample RUM sessions (in this example, 80% of session are sent to Datadog. Default is 100%).
  ddConfig.sessionSamplingRate = 100;
  // Optional: Sample tracing integrations for network calls between your app and your backend (in this example, 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default is 20%)
  // You need to specify the hosts of your backends to enable tracing with these backends
  ddConfig.resourceTracingSamplingRate = 100;
  ddConfig.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'
  // Optional: set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
  ddConfig.serviceName = 'com.example.reactnative';
  // Optional: let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
  ddConfig.verbosity = SdkVerbosity.WARN;

  return <DatadogProvider configuration={ddConfig}>{children}</DatadogProvider>;
};

export { KfProvider };
