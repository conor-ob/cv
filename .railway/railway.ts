import { defineRailway, github, preserve, project, service } from "railway/iac";

export default defineRailway(() => {
  const cv = service("cv", {
    source: github("conor-ob/cv", { checkSuites: false }),
    build: { builder: "DOCKERFILE", dockerfilePath: "Dockerfile" },
    replicas: { "europe-west4-drams3a": 1 },
    deploy: { limitOverride: { containers: { cpu: 1, diskBytes: 100000000000, memoryBytes: 1000000000 } } },
    domains: ["cv.conorob.me"],
    networking: { privateNetworkEndpoint: "cv" },
    env: { VITE_SITE: preserve() },
  });

  return project("cv", {
    resources: [cv],
  });
});
