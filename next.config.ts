import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

import bundleAnalyzer from "@next/bundle-analyzer";
import type { RuleSetRule } from "webpack";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

export default function nextConfig(phase: string): NextConfig {
  const nextConfig: NextConfig = {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next/dev" : ".next/prod",
    reactCompiler: true,
    htmlLimitedBots: /.*/,
    turbopack: {
      rules: {
        "*.svg": {
          loaders: [
            {
              loader: "@svgr/webpack",
              options: {
                typescript: true,
                icon: true,
                titleProp: true,
                svgo: true,
                prettier: false
              }
            }
          ],
          as: "*.js"
        }
      }
    },
    webpack(config) {
      const rules = config.module.rules as RuleSetRule[];
      const fileLoaderRule = rules.find(
        (rule): rule is RuleSetRule =>
          !!rule &&
          typeof rule === "object" &&
          rule.test instanceof RegExp &&
          rule.test.test(".svg")
      );
      if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;
      config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ["@svgr/webpack"] });
      return config;
    }
  };

  return withBundleAnalyzer(nextConfig);
}
