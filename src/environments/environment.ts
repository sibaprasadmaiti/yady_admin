// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
      // api_url:'http://nodeserver.brainiuminfotech.com:4104/'
    //  api_url : 'http://localhost:4104/'
        //api_url : 'http://localhost:4204/'
      api_url:'https://nodeserver.mydevfactory.com:3377/',
      SOCKET_ENDPOINT: 'https://nodeserver.mydevfactory.com:3377',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
