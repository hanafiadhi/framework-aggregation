import { registerAs } from '@nestjs/config';
import { getBoolean } from 'src/common/utilities/common.utility';

export default registerAs(
  'swagger',
  (): Record<string, any> => ({
    config: {
      info: {
        title: 'App Aggregation',
      },
      swaggerUI: getBoolean(process.env.SWAGGER_ENABLED) || false,
      documentationPath: '/app/docs',
    },
    options: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    localUri: process.env.SWAGGER_LOCAL_SERVER,
    develompentUri: process.env.SWAGGER_DEVELOPMENT_SERVER,
    productionUri: process.env.SWAGGER_PRODUCTION_SERVER,
  }),
);
