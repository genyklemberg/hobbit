import { ErrorHandler, Injectable} from '@angular/core';
import { Logger } from "angular2-logger/core";


@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

  constructor( private _logger: Logger ){	}

  handleError(error) {
    this._logger.log(error);
  }
}
