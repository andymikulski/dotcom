// Imports (Logger, Factory)
import Logger = require('logger');
import reqFactory = require('factory');
import reqEditor = require('editor');

/**
 * App class.
 * Creates Logger and Factory instances.
 */
export class App {
    Logger: any;
    Factory: any;
    Editor: any;
    log: any;

    constructor() {
        this.log = Logger.log;
        this.log('App : Constructor');
        this.Factory = reqFactory.Factory;
        this.Editor = reqEditor.Editor;
        this.init();
    }
    init() {
        this.log('App : init');
        this.Factory.init();
    }
}