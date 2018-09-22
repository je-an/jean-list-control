(function (root, factory) { 
 	 if (typeof define === 'function' && define.amd) { 
	 	 define([], factory); 
	} else { 
	 	root.ListControl = root.ListControl || {}; 
	 	root.ListControl = factory();
	}
}(this, function() {
var require, define;
(function (window) {
    var modules = { resolved: {}, unresolved: {} };
    function getResolvedModules(dependencies) {
        for (var i = 0, resolvedModules = []; i < dependencies.length; i++) {
            var resolvedModule = modules.resolved[dependencies[i]];
            if (resolvedModule) {
                resolvedModules.push(resolvedModule);
            }
        }
        return resolvedModules;
    }
    function checkUnresolved() {
        for (var id in modules.unresolved) {
            var module = modules.unresolved[id];
            var resolvedModules = getResolvedModules(module.dependencies);
            resolve(id, module.factory, module.dependencies, resolvedModules, false);
        }
    }
    function resolve(id, factory, dependencies, resolvedModules, saveUnresolved) {
        if (resolvedModules.length === dependencies.length) {
            var mod = factory.apply(factory, resolvedModules);
            modules.resolved[id] = mod ? mod : {};
        } else if (saveUnresolved) {
            modules.unresolved[id] = {
                dependencies: dependencies,
                factory: factory
            }
        }
    }
    define = function (id, dependencies, factory) {
        if (modules.resolved[id]) {
            console.warn("There is already a module with id <" + id + "> defined. Therefore this module will be ignored");
            return;
        } else if ((typeof id !== "string") || (!Array.isArray(dependencies)) || (typeof factory !== "function")) {
            console.warn("Passed arguments for module are invalid");
            return;
        }
        if (dependencies.length === 0) {
            resolve(id, factory, dependencies, [], false);
        } else {
            resolve(id, factory, dependencies, getResolvedModules(dependencies), true);
        }
        checkUnresolved();
    };
    define.amd = {}; 
    require = function (dependencies, factory) {
        dependencies = Array.isArray(dependencies) ? dependencies : [dependencies];
        var resolvedModules = getResolvedModules(dependencies);
        if(resolvedModules.length === 1 && !factory){
            return resolvedModules[0];
        }
        if (resolvedModules.length === dependencies.length && factory) {
            factory.apply(factory, resolvedModules);
        } else {
            throw new Error("Not all modules are resolved");
        }
    };
})();
define("node_modules/jean-amd/dist/jean-amd", function(){});

define('TypeCheck',[], function () {
    return {
        /**
         * Checks if provided element type is string
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is string, false otherwise
         */
        isString: function (o) {
            return (typeof o === "string") ? true : false;
        },
        /** 
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isBoolean: function (o) {
            return (typeof o === "boolean") ? true : false;
        },
        /**
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isNumber: function (o) {
            return (typeof o === "number") ? true : false;
        },
        /**
         * Checks if provided element is an object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isObject: function (o) {
            return !this.isArray(o) && o !== null && typeof o === 'object';
        },
        /**
         * Checks if provided element is an empty object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isEmptyObject: function (o) {
            var isEmpty = false;
            if (this.isObject(o) && Object.keys(o).length === 0) {
                isEmpty = true;
            }
            return isEmpty;
        },
        /**
        * Checks if provided element is a function
        * @public
        * @memberof TypeCheck
        * @param {Any} o - element to be checked
        * @returns {Boolean} True, if element is a function, false otherwise
        */
        isFunction: function (o) {
            return (typeof o === "function") ? true : false;
        },
        /**
         * Checks if provided element is defined
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is defined, false otherwise
         */
        isDefined: function (o) {
            return (o !== undefined && o != null);
        },
        /**
         * Checks if provided element is an array
         * @public 
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - true if o is an array, false otherwise
         */
        isArray: function (o) {
            return Array.isArray(o);
        },
        /**
         * Check id provided element is an empty array
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - True if o is an empty array, false otherwise
         */
        isEmptyArray: function (o) {
            return this.isArray(o) && (o.length === 0);
        },
        /**
         * Checks if all elements in this array have the same type
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If options.type is not a string
         * @throws {TypeError} - If options.array is not a string
         * @param {Any[]} array - Array to be checked
         * @param {String} type - Type of elements in this array. Valid values are all which matches 
         *                        to the typeof operator
         * @returns {Boolean} - true if all elements in the array have the same type, false otherwise
         */
        isArrayTypeOf: function (array, type) {
            var isTypeOf = true;
            if (!this.isString(type)) {
                throw new TypeError("options.type is not a string");
            }
            if (!Array.isArray(array)) {
                throw new TypeError("options.array is not an array");
            }
            if (array.length === 0) {
                isTypeOf = false;
            }
            for (var i = 0, length = array.length; i < length; i++) {
                var o = array[i];
                if (typeof o !== type) {
                    isTypeOf = false;
                    break;
                }
            }
            return isTypeOf;
        },
        /**
          * Checks if all objects within array have the same instance
          * @public
          * @memberof TypeCheck
          * @throws {TypeError} - If array is not an array
          * @throws {TypeError} - If constructor is not a function
          * @param {Object[]} array - The array which objects shall be checked
          * @param {Function} fn - the constructor function
          * @returns {Boolean} - True if all elements have the same instance, false otherwise
          */
        areObjectsInstanceOf: function (array, fn) {
            if (!this.isArray(array)) {
                throw new TypeError("array is not an array");
            }
            if (!this.isFunction(fn)) {
                throw new TypeError("fn is not a function");
            }
            var i, o, length = array.length, result = true;
            for (i = 0; i < length; i++) {
                o = array[i];
                if (!this.isObject(o) || !this.isInstanceOf(o, fn)) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if the objects have are instances of the provided constructors
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If array is not an array
         * @throws {TypeError} - If constructors is not an array
         * @param {Object[]} objects - The array which objects shall be checked
         * @param {Function[]} constructors - An array of constructor functions
         * @returns {Boolean} - True if all elements have the same instance, false otherwise
         */
        areObjectsInstancesOf: function (objects, constructors) {
            var i, j, o, length = objects.length, constructorLength = constructors.length, result = true, noConstructorMatched;
            if (!this.isArray(objects)) {
                throw new TypeError("objects is not an array");
            }
            if (!this.isArray(constructors)) {
                throw new TypeError("constructors is not an array");
            }
            if (!this.isArrayTypeOf(constructors, "function")) {
                throw new TypeError("constructors is not an array of constructor functions");
            }
            for (i = 0; i < length; i++) {
                o = objects[i];
                noConstructorMatched = true;
                for (j = 0; j < constructorLength; j++) {
                    if (!this.isObject(o)) {
                        break;
                    }
                    if (this.isInstanceOf(o, constructors[j])) {
                        noConstructorMatched = false;
                        break;
                    }
                }
                if (noConstructorMatched === true) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if child is an instance of parent
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If child is not an object
         * @throws {TypeError} - If parent is not a function
         * @param {Object} child - The object which shall be checked
         * @param {Function} parent - The function which shall be the constructor
         * @returns {Boolean} - True if child is an instance of parent, false otherwise
         */
        isInstanceOf: function (child, parent) {
            if (!this.isObject(child)) {
                throw new TypeError("child is not an object");
            }
            if (!this.isFunction(parent)) {
                throw new TypeError("parent is not a function");
            }
            return child instanceof parent;
        },
        /**
         * Checks if the provided value is a value of the provided object which is used as an enum
         * @throws {TypeError} - If value is not a string or a number
         * @throws {TypeError} - If o is not an object
         * @param {String|Number} value - the value
         * @param {Object} o - the object which shall be checked
         * @returns {Boolean} - True if value is part of o, false otherwise
         */
        isEnumValue: function (value, o) {
            if (!this.isString(value) && !this.isNumber(value)) {
                throw new TypeError("value must be a String or a Number");
            }
            if (!this.isObject(o)) {
                throw new TypeError("o is not an object");
            }
            var keys = Object.keys(o), length = keys.length, i, isValue = false;
            for (i = 0; i < length; i++) {
                if (o[keys[i]] === value) {
                    isValue = true;
                    break;
                }
            }
            return isValue;
        }
    };
});
define('Failure',[], function () {
    /**
     * Provides error throwing functionality 
     * @alias Failure 
     */
    return {
        /**
         * Throws an Error with the provided errorMessage
         * @throws {Error}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this Error
         */
        throwError: function (errorMessage) {
            throw new Error(errorMessage);
        },
        /**
         * Throws an TypeError with the provided errorMessage
         * @throws {TypeError}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this TypeError
         */
        throwTypeError: function (errorMessage) {
            throw new TypeError(errorMessage);
        }
    };
});
!function(r,n){"function"==typeof define&&define.amd?define('Inheritance',[],n):"object"==typeof module&&module.exports?module.exports=n():(r.Inheritance=r.Inheritance||{},r.Inheritance=n())}(this,function(){var r,n;return function(e){function t(r){for(var n=0,e=[];n<r.length;n++){var t=s.resolved[r[n]];t&&e.push(t)}return e}function i(){for(var r in s.unresolved){var n=s.unresolved[r],e=t(n.dependencies);o(r,n.factory,n.dependencies,e,!1)}}function o(r,n,e,t,i){t.length===e.length?s.resolved[r]=n.apply(n,t):i&&(s.unresolved[r]={dependencies:e,factory:n})}var s={resolved:{},unresolved:{}};n=function(r,n,e){return s.resolved[r]?void console.warn("There is already a module with id <"+r+"> defined. Therefore this module will be ignored"):"string"==typeof r&&Array.isArray(n)&&"function"==typeof e?(0===n.length?o(r,e,n,[],!1):o(r,e,n,t(n),!0),void i()):void console.warn("Passed arguments for module are invalid")},n.amd={},r=function(r,n){r=Array.isArray(r)?r:[r];var e=t(r);if(1===e.length&&!n)return e[0];if(e.length!==r.length||!n)throw new Error("Not all modules are resolved");n.apply(n,e)}}(),n("node_modules/jean-amd/dist/jean-amd",function(){}),n("TypeCheck",[],function(){return{isString:function(r){return"string"==typeof r},isBoolean:function(r){return"boolean"==typeof r},isNumber:function(r){return"number"==typeof r},isObject:function(r){var n=!1;if(this.isString(r)||this.isFunction(r))return!1;if(this.isEmptyObject(r))return!0;for(var e in r)if(r.hasOwnProperty(e)){n=!0;break}return n},isEmptyObject:function(r){var n=!0;if(!this.isDefined(r)||this.isBoolean(r)||this.isFunction(r)||this.isNumber(r)||this.isString(r)||Array.isArray(r))return!1;for(var e in r)if(r.hasOwnProperty(e)){n=!1;break}return n},isFunction:function(r){return"function"==typeof r},isDefined:function(r){return void 0!==r&&null!=r},isArrayTypeOf:function(r,n){var e=!0;if(!this.isString(n))throw new TypeError("options.type is not a string");if(!Array.isArray(r))throw new TypeError("options.array is not an array");0===r.length&&(e=!1);for(var t=0,i=r.length;t<i;t++){if(typeof r[t]!==n){e=!1;break}}return e}}}),n("src/Inheritance",["TypeCheck"],function(r){return{inheritConstructor:function(n,e,t){var i=!1,t=t||{};return r.isFunction(n)&&r.isObject(e)&&(Array.isArray(t)?n.apply(e,t):n.apply(e,[t]),i=!0),i},inheritPrototype:function(n,e){var t=!1;return r.isFunction(n)&&r.isFunction(e)&&(n.prototype=Object.create(e.prototype),n.prototype.constructor=n,t=!0),t}}}),r("src/Inheritance")});
!function(r,e){"function"==typeof define&&define.amd?define('DomElement',[],e):(r.DomElement=r.DomElement||{},r.DomElement=e())}(this,function(){var r,e;return function(n){function t(r){for(var e=0,n=[];e<r.length;e++){var t=s.resolved[r[e]];t&&n.push(t)}return n}function i(){for(var r in s.unresolved){var e=s.unresolved[r],n=t(e.dependencies);o(r,e.factory,e.dependencies,n,!1)}}function o(r,e,n,t,i){if(t.length===n.length){var o=e.apply(e,t);s.resolved[r]=o||{}}else i&&(s.unresolved[r]={dependencies:n,factory:e})}var s={resolved:{},unresolved:{}};e=function(r,e,n){return s.resolved[r]?void console.warn("There is already a module with id <"+r+"> defined. Therefore this module will be ignored"):"string"==typeof r&&Array.isArray(e)&&"function"==typeof n?(0===e.length?o(r,n,e,[],!1):o(r,n,e,t(e),!0),void i()):void console.warn("Passed arguments for module are invalid")},e.amd={},r=function(r,e){r=Array.isArray(r)?r:[r];var n=t(r);if(1===n.length&&!e)return n[0];if(n.length!==r.length||!e)throw new Error("Not all modules are resolved");e.apply(e,n)}}(),e("node_modules/jean-amd/dist/jean-amd",function(){}),e("TypeCheck",[],function(){return{isString:function(r){return"string"==typeof r},isBoolean:function(r){return"boolean"==typeof r},isNumber:function(r){return"number"==typeof r},isObject:function(r){var e=!1;if(this.isString(r)||this.isFunction(r))return!1;if(this.isEmptyObject(r))return!0;for(var n in r)if(r.hasOwnProperty(n)){e=!0;break}return e},isEmptyObject:function(r){var e=!0;if(!this.isDefined(r)||this.isBoolean(r)||this.isFunction(r)||this.isNumber(r)||this.isString(r)||Array.isArray(r))return!1;for(var n in r)if(r.hasOwnProperty(n)){e=!1;break}return e},isFunction:function(r){return"function"==typeof r},isDefined:function(r){return void 0!==r&&null!=r},isArray:function(r){return Array.isArray(r)},isEmptyArray:function(r){return this.isArray(r)&&0===r.length},isArrayTypeOf:function(r,e){var n=!0;if(!this.isString(e))throw new TypeError("options.type is not a string");if(!Array.isArray(r))throw new TypeError("options.array is not an array");0===r.length&&(n=!1);for(var t=0,i=r.length;t<i;t++){if(typeof r[t]!==e){n=!1;break}}return n},areObjectsInstanceOf:function(r,e){if(!this.isArray(r))throw new TypeError("array is not an array");if(!this.isFunction(e))throw new TypeError("fn is not a function");var n,t,i=r.length,o=!0;for(n=0;n<i;n++)if(t=r[n],!this.isObject(t)||!this.isInstanceOf(t,e)){o=!1;break}return o},areObjectsInstancesOf:function(r,e){var n,t,i,o,s=r.length,a=e.length,f=!0;if(!this.isArray(r))throw new TypeError("objects is not an array");if(!this.isArray(e))throw new TypeError("constructors is not an array");if(!this.isArrayTypeOf(e,"function"))throw new TypeError("constructors is not an array of constructor functions");for(n=0;n<s;n++){for(i=r[n],o=!0,t=0;t<a&&this.isObject(i);t++)if(this.isInstanceOf(i,e[t])){o=!1;break}if(!0===o){f=!1;break}}return f},isInstanceOf:function(r,e){if(!this.isObject(r))throw new TypeError("child is not an object");if(!this.isFunction(e))throw new TypeError("parent is not a function");return r instanceof e},isEnumValue:function(r,e){if(!this.isString(r)&&!this.isNumber(r))throw new TypeError("value must be a String or a Number");if(!this.isObject(e))throw new TypeError("o is not an object");var n,t=Object.keys(e),i=t.length,o=!1;for(n=0;n<i;n++)if(e[t[n]]===r){o=!0;break}return o}}}),e("Failure",[],function(){return{throwError:function(r){throw new Error(r)},throwTypeError:function(r){throw new TypeError(r)}}}),function(r,n){"function"==typeof e&&e.amd?e("DomUtil",[],n):(r.DomUtil=r.DomUtil||{},r.DomUtil=n())}(this,function(){var r,e;return function(n){function t(r){for(var e=0,n=[];e<r.length;e++){var t=s.resolved[r[e]];t&&n.push(t)}return n}function i(){for(var r in s.unresolved){var e=s.unresolved[r],n=t(e.dependencies);o(r,e.factory,e.dependencies,n,!1)}}function o(r,e,n,t,i){if(t.length===n.length){var o=e.apply(e,t);s.resolved[r]=o||{}}else i&&(s.unresolved[r]={dependencies:n,factory:e})}var s={resolved:{},unresolved:{}};e=function(r,e,n){return s.resolved[r]?void console.warn("There is already a module with id <"+r+"> defined. Therefore this module will be ignored"):"string"==typeof r&&Array.isArray(e)&&"function"==typeof n?(0===e.length?o(r,n,e,[],!1):o(r,n,e,t(e),!0),void i()):void console.warn("Passed arguments for module are invalid")},e.amd={},r=function(r,e){r=Array.isArray(r)?r:[r];var n=t(r);if(1===n.length&&!e)return n[0];if(n.length!==r.length||!e)throw new Error("Not all modules are resolved");e.apply(e,n)}}(),e("node_modules/jean-amd/dist/jean-amd",function(){}),e("TypeCheck",[],function(){return{isString:function(r){return"string"==typeof r},isBoolean:function(r){return"boolean"==typeof r},isNumber:function(r){return"number"==typeof r},isObject:function(r){var e=!1;if(this.isString(r)||this.isFunction(r))return!1;if(this.isEmptyObject(r))return!0;for(var n in r)if(r.hasOwnProperty(n)){e=!0;break}return e},isEmptyObject:function(r){var e=!0;if(!this.isDefined(r)||this.isBoolean(r)||this.isFunction(r)||this.isNumber(r)||this.isString(r)||Array.isArray(r))return!1;for(var n in r)if(r.hasOwnProperty(n)){e=!1;break}return e},isFunction:function(r){return"function"==typeof r},isDefined:function(r){return void 0!==r&&null!=r},isArray:function(r){return Array.isArray(r)},isArrayTypeOf:function(r,e){var n=!0;if(!this.isString(e))throw new TypeError("options.type is not a string");if(!Array.isArray(r))throw new TypeError("options.array is not an array");0===r.length&&(n=!1);for(var t=0,i=r.length;t<i;t++)if(typeof r[t]!==e){n=!1;break}return n},isInstanceOf:function(r,e){if(!this.isObject(r))throw new TypeError("child is not an object");if(!this.isFunction(e))throw new TypeError("parent is not a function");return r instanceof e}}}),e("Failure",[],function(){return{throwError:function(r){throw new Error(r)},throwTypeError:function(r){throw new TypeError(r)}}}),e("src/DomUtil",["TypeCheck","Failure"],function(r,e){return{createElementFromMarkup:function(n){r.isString(n)||e.throwTypeError("html is not a string");var t=document.createElement("div");return t.innerHTML=n.trim(),t.firstChild},isInViewPort:function(n){r.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is not an instance of HTMLElement");var t=n.getBoundingClientRect();return t.top+t.height>0&&t.top<window.innerHeight},getChildById:function(n,t){r.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),r.isString(t)||e.throwTypeError("id is not a string");var i,o,s=n.children,a=s.length,f=null;for(i=0;i<a;i++)if(o=s[i],o.id===t)return o;for(i=0;i<a;i++)if(f=this.getChildById(s[i],t),r.isDefined(f))return f;return null},getChildByClass:function(n,t){r.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),r.isString(t)||e.throwTypeError("className is not a string");var i,o,s=n.children,a=s.length,f=null;for(i=0;i<a;i++)if(o=s[i],o.classList.contains(t))return o;for(i=0;i<a;i++)if(f=this.getChildByClass(s[i],t),r.isDefined(f))return f;return null},getAncestorById:function(n,t){return r.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),r.isString(t)||e.throwTypeError("id is not a string"),r.isDefined(n.parentElement)?n.parentElement.id===t?n.parentElement:this.getAncestorById(n.parentElement,t):null},getAncestorByClass:function(n,t){return r.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),r.isString(t)||e.throwTypeError("className is not a string"),r.isDefined(n.parentElement)?n.parentElement.classList.contains(t)?n.parentElement:this.getAncestorById(n.parentElement,t):null}}}),r("src/DomUtil")}),function(r,n){"function"==typeof e&&e.amd?e("Interface",[],n):"object"==typeof module&&module.exports?module.exports=n():(r.Interface=r.Interface||{},r.Interface=n())}(this,function(){var r,e;return function(n){function t(r){for(var e=0,n=[];e<r.length;e++){var t=s.resolved[r[e]];t&&n.push(t)}return n}function i(){for(var r in s.unresolved){var e=s.unresolved[r],n=t(e.dependencies);o(r,e.factory,e.dependencies,n,!1)}}function o(r,e,n,t,i){t.length===n.length?s.resolved[r]=e.apply(e,t):i&&(s.unresolved[r]={dependencies:n,factory:e})}var s={resolved:{},unresolved:{}};e=function(r,e,n){return s.resolved[r]?void console.warn("There is already a module with id <"+r+"> defined. Therefore this module will be ignored"):"string"==typeof r&&Array.isArray(e)&&"function"==typeof n?(0===e.length?o(r,n,e,[],!1):o(r,n,e,t(e),!0),void i()):void console.warn("Passed arguments for module are invalid")},e.amd={},r=function(r,e){r=Array.isArray(r)?r:[r];var n=t(r);if(1===n.length&&!e)return n[0];if(n.length!==r.length||!e)throw new Error("Not all modules are resolved");e.apply(e,n)}}(),e("node_modules/jean-amd/dist/jean-amd",function(){}),e("NotImplementedError",[],function(){var r=function(r){this.name="NotImplementedError",this.message=r||"Function must be implemented in Class"};return r.prototype=Error.prototype,r}),e("TypeCheck",[],function(){return{isString:function(r){return"string"==typeof r},isBoolean:function(r){return"boolean"==typeof r},isNumber:function(r){return"number"==typeof r},isObject:function(r){var e=!1;if(this.isString(r)||this.isFunction(r))return!1;if(this.isEmptyObject(r))return!0;for(var n in r)if(r.hasOwnProperty(n)){e=!0;break}return e},isEmptyObject:function(r){var e=!0;if(!this.isDefined(r)||this.isBoolean(r)||this.isFunction(r)||this.isNumber(r)||this.isString(r)||Array.isArray(r))return!1;for(var n in r)if(r.hasOwnProperty(n)){e=!1;break}return e},isFunction:function(r){return"function"==typeof r},isDefined:function(r){return void 0!==r&&null!=r},isArrayTypeOf:function(r,e){var n=!0;if(!this.isString(e))throw new TypeError("options.type is not a string");if(!Array.isArray(r))throw new TypeError("options.array is not an array");0===r.length&&(n=!1);for(var t=0,i=r.length;t<i;t++)if(typeof r[t]!==e){n=!1;break}return n}}}),e("Failure",[],function(){return{throwError:function(r){throw new Error(r)},throwTypeError:function(r){throw new TypeError(r)}}}),e("src/Interface",["NotImplementedError","TypeCheck","Failure"],function(r,e,n){return{areMembersImplemented:function(r,t){e.isObject(t)||n.throwTypeError("instance is not an object"),e.isArrayTypeOf(r,"string")||n.throwTypeError("memberList is no a string array");var i,o=r.length,s="",a=[];for(i=0;i<o;i++)s=r[i],t.hasOwnProperty(s)||a.push(s);if(a.length>0)throw new TypeError("Members "+a.join(" ")+" are not implemented");return!0},areMethodsImplemented:function(t,i){e.isObject(i)||n.throwTypeError("instance is not an object"),e.isArrayTypeOf(t,"string")||n.throwTypeError("methodList is no a string array");var o,s=t.length,a="",f=Object.getPrototypeOf(i),u=[];for(o=0;o<s;o++)a=t[o],f.hasOwnProperty(a)||u.push(a);if(u.length>0)throw new r("Methods "+u.join(" ")+" are not implemented");return!0}}}),r("src/Interface")}),e("src/DomElement",["TypeCheck","Failure","DomUtil","Interface"],function(r,e,n,t){var i=function(i){this.options=r.isDefined(i)?i:e.throwTypeError("options is undefined"),this.element=r.isString(i.html)?n.createElementFromMarkup(i.html):e.throwTypeError("options.html is not a string"),t.areMethodsImplemented(["set","get","clear","isDataValid","lock","unlock"],this)};return i.prototype.attachToDom=function(){return this.element.style.display="block",!0},i.prototype.detachFromDom=function(){return this.element.style.display="none",!0},i}),r("src/DomElement")});
!function(n,r){"function"==typeof define&&define.amd?define('DomUtil',[],r):(n.DomUtil=n.DomUtil||{},n.DomUtil=r())}(this,function(){var n,r;return function(e){function t(n){for(var r=0,e=[];r<n.length;r++){var t=s.resolved[n[r]];t&&e.push(t)}return e}function i(){for(var n in s.unresolved){var r=s.unresolved[n],e=t(r.dependencies);o(n,r.factory,r.dependencies,e,!1)}}function o(n,r,e,t,i){if(t.length===e.length){var o=r.apply(r,t);s.resolved[n]=o||{}}else i&&(s.unresolved[n]={dependencies:e,factory:r})}var s={resolved:{},unresolved:{}};r=function(n,r,e){return s.resolved[n]?void console.warn("There is already a module with id <"+n+"> defined. Therefore this module will be ignored"):"string"==typeof n&&Array.isArray(r)&&"function"==typeof e?(0===r.length?o(n,e,r,[],!1):o(n,e,r,t(r),!0),void i()):void console.warn("Passed arguments for module are invalid")},r.amd={},n=function(n,r){n=Array.isArray(n)?n:[n];var e=t(n);if(1===e.length&&!r)return e[0];if(e.length!==n.length||!r)throw new Error("Not all modules are resolved");r.apply(r,e)}}(),r("node_modules/jean-amd/dist/jean-amd",function(){}),r("TypeCheck",[],function(){return{isString:function(n){return"string"==typeof n},isBoolean:function(n){return"boolean"==typeof n},isNumber:function(n){return"number"==typeof n},isObject:function(n){return!this.isArray(n)&&null!==n&&"object"==typeof n},isEmptyObject:function(n){var r=!1;return this.isObject(n)&&0===Object.keys(n).length&&(r=!0),r},isFunction:function(n){return"function"==typeof n},isDefined:function(n){return void 0!==n&&null!=n},isArray:function(n){return Array.isArray(n)},isEmptyArray:function(n){return this.isArray(n)&&0===n.length},isArrayTypeOf:function(n,r){var e=!0;if(!this.isString(r))throw new TypeError("options.type is not a string");if(!Array.isArray(n))throw new TypeError("options.array is not an array");0===n.length&&(e=!1);for(var t=0,i=n.length;t<i;t++){if(typeof n[t]!==r){e=!1;break}}return e},areObjectsInstanceOf:function(n,r){if(!this.isArray(n))throw new TypeError("array is not an array");if(!this.isFunction(r))throw new TypeError("fn is not a function");var e,t,i=n.length,o=!0;for(e=0;e<i;e++)if(t=n[e],!this.isObject(t)||!this.isInstanceOf(t,r)){o=!1;break}return o},areObjectsInstancesOf:function(n,r){var e,t,i,o,s=n.length,a=r.length,f=!0;if(!this.isArray(n))throw new TypeError("objects is not an array");if(!this.isArray(r))throw new TypeError("constructors is not an array");if(!this.isArrayTypeOf(r,"function"))throw new TypeError("constructors is not an array of constructor functions");for(e=0;e<s;e++){for(i=n[e],o=!0,t=0;t<a&&this.isObject(i);t++)if(this.isInstanceOf(i,r[t])){o=!1;break}if(!0===o){f=!1;break}}return f},isInstanceOf:function(n,r){if(!this.isObject(n))throw new TypeError("child is not an object");if(!this.isFunction(r))throw new TypeError("parent is not a function");return n instanceof r},isEnumValue:function(n,r){if(!this.isString(n)&&!this.isNumber(n))throw new TypeError("value must be a String or a Number");if(!this.isObject(r))throw new TypeError("o is not an object");var e,t=Object.keys(r),i=t.length,o=!1;for(e=0;e<i;e++)if(r[t[e]]===n){o=!0;break}return o}}}),r("Failure",[],function(){return{throwError:function(n){throw new Error(n)},throwTypeError:function(n){throw new TypeError(n)}}}),r("src/DomUtil",["TypeCheck","Failure"],function(n,r){return{createElementFromMarkup:function(e){n.isString(e)||r.throwTypeError("html is not a string");var t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild},isInViewPort:function(e){n.isInstanceOf(e,HTMLElement)||r.throwTypeError("element is not an instance of HTMLElement");var t=e.getBoundingClientRect();return t.top+t.height>0&&t.top<window.innerHeight},getChildById:function(e,t){n.isInstanceOf(e,HTMLElement)||r.throwTypeError("element is no instance of HTMLElement"),n.isString(t)||r.throwTypeError("id is not a string");var i,o,s=e.children,a=s.length,f=null;for(i=0;i<a;i++)if(o=s[i],o.id===t)return o;for(i=0;i<a;i++)if(f=this.getChildById(s[i],t),n.isDefined(f))return f;return null},getChildByClass:function(e,t){n.isInstanceOf(e,HTMLElement)||r.throwTypeError("element is no instance of HTMLElement"),n.isString(t)||r.throwTypeError("className is not a string");var i,o,s=e.children,a=s.length,f=null;for(i=0;i<a;i++)if(o=s[i],o.classList.contains(t))return o;for(i=0;i<a;i++)if(f=this.getChildByClass(s[i],t),n.isDefined(f))return f;return null},getAncestorById:function(e,t){return n.isInstanceOf(e,HTMLElement)||r.throwTypeError("element is no instance of HTMLElement"),n.isString(t)||r.throwTypeError("id is not a string"),n.isDefined(e.parentElement)?e.parentElement.id===t?e.parentElement:this.getAncestorById(e.parentElement,t):null},getAncestorByClass:function(e,t){return n.isInstanceOf(e,HTMLElement)||r.throwTypeError("element is no instance of HTMLElement"),n.isString(t)||r.throwTypeError("className is not a string"),n.isDefined(e.parentElement)?e.parentElement.classList.contains(t)?e.parentElement:this.getAncestorById(e.parentElement,t):null}}}),n("src/DomUtil")});
!function(r,e){"function"==typeof define&&define.amd?define('Merge',[],e):"object"==typeof module&&module.exports?module.exports=e():(r.Merge=r.Merge||{},r.Merge=e())}(this,function(){var r,e;return function(n){function t(r){for(var e=0,n=[];e<r.length;e++){var t=s.resolved[r[e]];t&&n.push(t)}return n}function o(){for(var r in s.unresolved){var e=s.unresolved[r],n=t(e.dependencies);i(r,e.factory,e.dependencies,n,!1)}}function i(r,e,n,t,o){t.length===n.length?s.resolved[r]=e.apply(e,t):o&&(s.unresolved[r]={dependencies:n,factory:e})}var s={resolved:{},unresolved:{}};e=function(r,e,n){return s.resolved[r]?void console.warn("There is already a module with id <"+r+"> defined. Therefore this module will be ignored"):"string"==typeof r&&Array.isArray(e)&&"function"==typeof n?(0===e.length?i(r,n,e,[],!1):i(r,n,e,t(e),!0),void o()):void console.warn("Passed arguments for module are invalid")},e.amd={},r=function(r,e){r=Array.isArray(r)?r:[r];var n=t(r);if(1===n.length&&!e)return n[0];if(n.length!==r.length||!e)throw new Error("Not all modules are resolved");e.apply(e,n)}}(),e("node_modules/jean-amd/dist/jean-amd",function(){}),e("TypeCheck",[],function(){return{isString:function(r){return"string"==typeof r},isBoolean:function(r){return"boolean"==typeof r},isNumber:function(r){return"number"==typeof r},isObject:function(r){var e=!1;if(this.isString(r)||this.isFunction(r))return!1;if(this.isEmptyObject(r))return!0;for(var n in r)if(r.hasOwnProperty(n)){e=!0;break}return e},isEmptyObject:function(r){var e=!0;if(!this.isDefined(r)||this.isBoolean(r)||this.isFunction(r)||this.isNumber(r)||this.isString(r)||Array.isArray(r))return!1;for(var n in r)if(r.hasOwnProperty(n)){e=!1;break}return e},isFunction:function(r){return"function"==typeof r},isDefined:function(r){return void 0!==r&&null!=r},isArray:function(r){return Array.isArray(r)},isArrayTypeOf:function(r,e){var n=!0;if(!this.isString(e))throw new TypeError("options.type is not a string");if(!Array.isArray(r))throw new TypeError("options.array is not an array");0===r.length&&(n=!1);for(var t=0,o=r.length;t<o;t++){if(typeof r[t]!==e){n=!1;break}}return n}}}),e("Failure",[],function(){return{throwError:function(r){throw new Error(r)},throwTypeError:function(r){throw new TypeError(r)}}}),e("src/Merge",["TypeCheck","Failure"],function(r,e){return function(n,t){r.isObject(n)&&r.isObject(t)||e.throwTypeError("defaultOptions or options is not an object");var o,i,s={},u=Object.keys(t),a=u.length,f=Object.keys(n),c=f.length;for(o=0;o<c;o++)i=f[o],s[i]=n[i];for(o=0;o<a;o++)i=u[o],s[i]=t[i];return s}}),r("src/Merge")});
define('text',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

define('text!list-control-html',[],function () { return '<div class="jean-list-control">\r\n    <div id="body">\r\n\r\n    </div>\r\n</div>';});


define('text!list-element-html',[],function () { return '<div id="jean-list-element">\r\n    <div id="name">\r\n\r\n    </div>\r\n    <div id="details">\r\n        \r\n    </div>\r\n</div>';});

define('normalize',{});
define('css',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

define('css!list-control-css',[],function(){});
define('src/ListControl',[ // jscs:ignore
    "TypeCheck",
    "Failure",
    "Inheritance",
    "DomElement",
    "DomUtil",
    "Merge",
    "text!list-control-html",
    "text!list-element-html",
    "css!list-control-css"
], function (
    TypeCheck,
    Failure,
    Inheritance,
    DomElement,
    DomUtil,
    Merge,
    controlHtml,
    elementHtml
) {
        /**
         * Provides functionality for displaying data as a list 
         * @alias ListControl 
         * @constructor
         * @param {Object} options - options object
         * @param {Number} [options.height=0] - height of the list in px. Per default there is no height
         */
        var ListControl = function (options) {
            Inheritance.inheritConstructor(DomElement, this, Merge({ // jscs:ignore
                html: controlHtml,
                height: TypeCheck.isNumber(options.height) ? options.height : 0
            }, TypeCheck.isDefined(options) ? options : {}));

            this._listElement = DomUtil.createElementFromMarkup(elementHtml);
            this._listElementFragment = document.createDocumentFragment();
            this.body = DomUtil.getChildById(this.element, "body");

            if (options.height > 0) {
                this.body.style.height = options.height + "px";
            }
        };
        Inheritance.inheritPrototype(ListControl, DomElement);
        // Have to be exposed for unit testing purposes
        ListControl.DomElement = DomElement;
        /** */
        ListControl.prototype.commit = function () {
            this.body.appendChild(this._listElementFragment);
        };
        /** 
         * @param {String} name - the name of the list element
         * @param {String} details - detail information of the list element
         */
        ListControl.prototype.set = function (name, details) {
            if (!TypeCheck.isString(name)) {
                Failure.throwTypeError("name is not a string");
            }
            if (!TypeCheck.isString(details)) {
                Failure.throwTypeError("details is not a string");
            }
            var listElement = this._listElement, node = listElement.cloneNode(true),
                fragment = this._listElementFragment;

            DomUtil.getChildById(node, "name").innerHTML = name;
            DomUtil.getChildById(node, "details").innerHTML = details;
            fragment.appendChild(node);
        };
        /** */
        ListControl.prototype.get = function () {

        };
        /** */
        ListControl.prototype.clear = function () {

        };
        /** */
        ListControl.prototype.isDataValid = function () {

        };
        /** */
        ListControl.prototype.lock = function () {

        };
        /** */
        ListControl.prototype.unlock = function () {

        };
        return ListControl;
    });

(function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})
('.jean-list-control {\n  color: black;\n  width: 100%;\n  border-radius: 5px;\n  border: 1px solid black;\n  padding: 5px;\n}\n.jean-list-control #body {\n  overflow-y: scroll;\n}\n.jean-list-control #body #jean-list-element {\n  color: black;\n}\n');

 	 return require('src/ListControl'); 
}));
