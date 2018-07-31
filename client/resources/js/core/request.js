import $ from 'jquery';

export default class Request {

    static send(config) {

        return new Promise((resolve, reject) => {

            const queryConfig = {
                type: 'GET',
                async: true,
                cache: false,
                dataType: 'json',
                processData: true,
                contentType: 'application/json; charset=utf-8',
                headers: {},
                success: (result) => {

                    const errorCodes = ['NOT_AUTH', 'ACCESS_DENIED'];
                    const {errorCode = '', success} = result;

                    if (!success) {
                        if (errorCodes.indexOf(errorCode) !== -1) {
                            window.location.href = '/';
                            return false;
                        }
                        else {
                            reject(result);
                        }
                    }

                    const {data} = result;
                    resolve(data);
                },
                error: (result) => {
                    reject(result);
                }
            };

            $.ajax({...queryConfig, ...config});
        });
    }

}