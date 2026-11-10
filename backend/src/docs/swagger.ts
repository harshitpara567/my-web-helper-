import swaggerJsdoc from "swagger-jsdoc";

const bearerAuth = [{ bearerAuth: [] }];

const jsonResponse = (description: string) => ({
  description,
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/StandardResponse" }
    }
  }
});

const options: swaggerJsdoc.OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Web Helper API",
      version: "1.0.0",
      description:
        "REST API powering the My Web Helper digital agency website — blog, portfolio, testimonials, enquiries, categories and the admin dashboard."
    },
    servers: [{ url: "http://localhost:5000/api" }],
    tags: [
      { name: "System", description: "Health and availability checks" },
      { name: "Auth", description: "Admin authentication" },
      { name: "Enquiries", description: "Contact enquiries" },
      { name: "Blogs", description: "Blog content" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      },
      schemas: {
        StandardResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: { nullable: true }
          },
          required: ["success"]
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 }
          }
        },
        EnquiryRequest: {
          type: "object",
          required: ["name", "email", "message"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            company: { type: "string" },
            phone: { type: "string" },
            service: { type: "string" },
            budget: { type: "string" },
            message: { type: "string", minLength: 20, maxLength: 4000 }
          }
        },
        BlogRequest: {
          type: "object",
          required: ["title", "excerpt", "content", "author"],
          properties: {
            title: { type: "string" },
            slug: { type: "string" },
            excerpt: { type: "string" },
            content: { type: "string" },
            coverImage: { type: "string", format: "uri" },
            category: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            author: { type: "string" },
            status: { type: "string", enum: ["draft", "published"] }
          }
        }
      }
    },
    paths: {
      "/health": {
        get: {
          tags: ["System"],
          summary: "API health check",
          responses: { "200": jsonResponse("API is running") }
        }
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Authenticate an admin and receive a JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } }
            }
          },
          responses: {
            "200": jsonResponse("Login successful"),
            "400": { description: "Validation failed" },
            "401": { description: "Invalid credentials" }
          }
        }
      },
      "/auth/me": {
        get: {
          tags: ["Auth"],
          summary: "Get the currently authenticated admin",
          security: bearerAuth,
          responses: {
            "200": jsonResponse("Current admin profile"),
            "401": { description: "Unauthorized" }
          }
        }
      },
      "/enquiries": {
        get: {
          tags: ["Enquiries"],
          summary: "List contact enquiries (admin)",
          security: bearerAuth,
          parameters: [
            {
              name: "status",
              in: "query",
              schema: {
                type: "string",
                enum: ["new", "read", "in-progress", "closed"]
              }
            },
            { name: "search", in: "query", schema: { type: "string" } },
            { name: "page", in: "query", schema: { type: "integer" } },
            { name: "limit", in: "query", schema: { type: "integer" } }
          ],
          responses: {
            "200": jsonResponse("List of enquiries"),
            "401": { description: "Unauthorized" }
          }
        },
        post: {
          tags: ["Enquiries"],
          summary: "Create a contact enquiry (public)",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/EnquiryRequest" } }
            }
          },
          responses: {
            "201": jsonResponse("Enquiry created"),
            "400": { description: "Validation failed" }
          }
        }
      },
      "/enquiries/{id}/status": {
        patch: {
          tags: ["Enquiries"],
          summary: "Update an enquiry status (admin)",
          security: bearerAuth,
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: {
                    status: {
                      type: "string",
                      enum: ["new", "read", "in-progress", "closed"]
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": jsonResponse("Enquiry status updated"),
            "401": { description: "Unauthorized" },
            "404": { description: "Enquiry not found" }
          }
        }
      },
      "/blogs": {
        get: {
          tags: ["Blogs"],
          summary: "List published blog posts (public)",
          parameters: [
            { name: "category", in: "query", schema: { type: "string" } },
            { name: "search", in: "query", schema: { type: "string" } },
            { name: "page", in: "query", schema: { type: "integer" } },
            { name: "limit", in: "query", schema: { type: "integer" } }
          ],
          responses: { "200": jsonResponse("List of published blog posts") }
        },
        post: {
          tags: ["Blogs"],
          summary: "Create a blog post (admin)",
          security: bearerAuth,
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/BlogRequest" } }
            }
          },
          responses: {
            "201": jsonResponse("Blog post created"),
            "400": { description: "Validation failed" },
            "401": { description: "Unauthorized" }
          }
        }
      },
      "/blogs/admin/all": {
        get: {
          tags: ["Blogs"],
          summary: "List all blog posts, including drafts (admin)",
          security: bearerAuth,
          responses: {
            "200": jsonResponse("List of all blog posts"),
            "401": { description: "Unauthorized" }
          }
        }
      },
      "/blogs/{slug}": {
        get: {
          tags: ["Blogs"],
          summary: "Get a published blog post by slug (public)",
          parameters: [
            { name: "slug", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            "200": jsonResponse("Blog post detail"),
            "404": { description: "Blog post not found" }
          }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec: Record<string, unknown> = swaggerJsdoc(options) as Record<
  string,
  unknown
>;
export default swaggerSpec;
