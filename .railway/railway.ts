import { defineRailway, github, preserve, project, service } from "railway/iac";

export default defineRailway(() => {
  const cv = service("cv", {
    source: github("conor-ob/cv", { checkSuites: false }),
    build: {
      builder: "DOCKERFILE",
      dockerfilePath: "Dockerfile" 
    },
    deploy: { 
      limitOverride: { 
        containers: { 
          cpu: 1,
          memoryBytes: 1000000000,
          diskBytes: 100000000000
        }
      },
      healthcheckPath: "/",
      healthcheckTimeout: 300,
      restartPolicyType: "ON_FAILURE",
      restartPolicyMaxRetries: 5,
      sleepApplication: false
    },
    replicas: { "europe-west4-drams3a": 1 },
    domains: ["cv.conorob.me"],
    networking: { privateNetworkEndpoint: "cv" },
    env: { VITE_SITE: preserve() },
  });

  return project("cv", {
    resources: [cv],
  });
});
