const File = require('./FileField');

class FileListField extends File {

  get schema() {
    return { type: 'JSON' };
  }

  get types(){
    return [];
  }

  static isJsonType(){
    return true;
  }

  static isFileType(){
    return true;
  }

  constructor() {
    super();
    this.props['class'] = 'table table-striped file-field';
    this.props['data-do'] = 'file-field';
    this.props['data-name'] = this.state.key;
    this.props['data-multiple'] = '1';
  }
}