import { defineRailway, github, project, service } from "railway/iac";

export default defineRailway(() => {
  const cv = service("cv", {
    source: github("conor-ob/cv", { checkSuites: false }),
    domains: ["cv.conorob.me"],
    build: {
      buildEnvironment: "V3",
      builder: "DOCKERFILE",
      dockerfilePath: "Dockerfile",
    },
    deploy: {
      healthcheckPath: "/",
      multiRegionConfig: {
        "europe-west4-drams3a": {
          numReplicas: 1,
        },
      },
    },
  });

  return project("cv", {
    resources: [cv],
  });
});
