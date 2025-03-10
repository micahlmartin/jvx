/**
 * @fileoverview ESLint plugin to enforce design system usage
 */
"use strict";

module.exports = {
  rules: {
    "require-design-system-tokens": {
      meta: {
        type: "problem",
        docs: {
          description: "Enforce usage of design system tokens",
          category: "Possible Errors",
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          TaggedTemplateExpression(node) {
            if (node.tag.name === "styled") {
              const template = node.quasi.quasis.map(quasi => quasi.value.raw).join("");
              
              // Check for hardcoded values
              const colorRegex = /#[0-9a-fA-F]{3,6}|rgb\(.*?\)|rgba\(.*?\)/g;
              const spacingRegex = /\d+px|\d+rem|\d+em/g;
              const zIndexRegex = /z-index:\s*\d+/g;
              
              const colorMatches = template.match(colorRegex);
              const spacingMatches = template.match(spacingRegex);
              const zIndexMatches = template.match(zIndexRegex);
              
              if (colorMatches) {
                context.report({
                  node,
                  message: "Use design system tokens for colors instead of hardcoded values"
                });
              }
              
              if (spacingMatches) {
                context.report({
                  node,
                  message: "Use design system tokens for spacing instead of hardcoded values"
                });
              }
              
              if (zIndexMatches) {
                context.report({
                  node,
                  message: "Use design system tokens for z-index instead of hardcoded values"
                });
              }
            }
          }
        };
      }
    },
    "enforce-handle-visibility": {
      meta: {
        type: "problem",
        docs: {
          description: "Enforce proper handle visibility implementation",
          category: "Possible Errors",
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          TaggedTemplateExpression(node) {
            if (node.tag.name === "styled" && node.quasi.quasis.some(quasi => quasi.value.raw.includes("Handle"))) {
              const template = node.quasi.quasis.map(quasi => quasi.value.raw).join("");
              
              if (template.includes("display: none")) {
                context.report({
                  node,
                  message: "Use opacity and pointer-events for handle visibility instead of display: none"
                });
              }
            }
          }
        };
      }
    },
    "enforce-property-row-separator": {
      meta: {
        type: "problem",
        docs: {
          description: "Enforce proper property row separator implementation",
          category: "Possible Errors",
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          TaggedTemplateExpression(node) {
            if (node.tag.name === "styled" && node.quasi.quasis.some(quasi => quasi.value.raw.includes("PropertyRow"))) {
              const template = node.quasi.quasis.map(quasi => quasi.value.raw).join("");
              
              if (!template.includes("::after") || !template.includes("content: ''")) {
                context.report({
                  node,
                  message: "PropertyRow must use ::after pseudo-element for separator"
                });
              }
            }
          }
        };
      }
    }
  }
}; 