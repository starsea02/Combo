"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fileRenameRoutes_1 = __importDefault(require("./routes/fileRenameRoutes"));
const app = (0, express_1.default)();
const port = 3000;
const swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'File Rename API',
            version: '1.0.0',
            description: 'API for triggering file rename operations in a directory.',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        paths: {
            '/api/rename-files': {
                post: {
                    summary: 'Trigger file rename operation',
                    tags: ['File Rename'],
                    requestBody: {
                        required: false,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        directoryPath: {
                                            type: 'string',
                                            example: 'D:\\Media\\MyFolder',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Rename completed successfully',
                        },
                        '500': {
                            description: 'Rename failed',
                        },
                    },
                },
            },
        },
    },
    apis: [],
});
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/api', fileRenameRoutes_1.default);
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
