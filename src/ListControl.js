define([ // jscs:ignore
    "TypeCheck",
    "Failure",
    "Inheritance",
    "ListControlBase",
    "DomUtil",
    "Merge",
    "text!list-control-html",
    "text!list-element-html",
    "css!list-control-css"
], function (
    TypeCheck,
    Failure,
    Inheritance,
    ListControlBase,
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
         * @param {Number} [options.height=0] - height of the list in px
         */
        var ListControl = function (options) {
            Inheritance.inheritConstructor(ListControlBase, this, Merge({ // jscs:ignore
                html: controlHtml,
                height: options.height
            }, TypeCheck.isDefined(options) ? options : {}));

            this._listElement = DomUtil.createElementFromMarkup(elementHtml);
            this._listElementFragment = document.createDocumentFragment();
            var body = this.body = DomUtil.getChildByClass(this.element, "body");
            body.addEventListener("click", this._onEntryClick.bind(this));
            body.addEventListener("scroll", this._onScroll.bind(this));

            if (options.height > 0) {
                body.style.height = options.height + "px";
            }
        };
        Inheritance.inheritPrototype(ListControl, ListControlBase);
        // Have to be exposed for unit testing purposes
        ListControl.ListControlBase = ListControlBase;
        /** */
        ListControl.ToggleValue = ListControl.prototype.ToggleValue = {
            COLLAPSED: 0,
            DISPLAYED: 1
        };
        /** @returns {Boolean} - True if the currently added rows are appended to DOM */
        ListControl.prototype.commit = function () {
            this.body.appendChild(this._listElementFragment);
            return true;
        };
        /** 
         * @throws {TypeError} - One or more values are invalid
         * @param {String} id - the id of the list element
         * @param {String} name - the name of the list element
         * @param {String} details - detail information of the list element
         */
        ListControl.prototype.add = function (id, name, details) {
            if (!this._areValuesValid(id, name, details)) {
                Failure.throwTypeError("One or more values are invalid");
            }
            var listElement = this._listElement, entry = listElement.cloneNode(true),
                fragment = this._listElementFragment, body = this.body;
            entry.setAttribute("id", id);
            this._setEntryValue(entry, name, details);
            body.appendChild(entry);
            return true;
        };
        /** 
         * @throws {TypeError} - One or more values are invalid
         * @param {String} id - the id of the list element
         * @param {String} name - the name of the list element
         * @param {String} details - detail information of the list element
         */
        ListControl.prototype.update = function (id, name, details) {
            if (!this._areValuesValid(id, name, details)) {
                Failure.throwTypeError("provided values are invalid");
            }
            this._setEntryValue(DomUtil.getChildById(this.body, id), name, details);
            return true;
        };
        /** */
        ListControl.prototype.get = function () {

        };
        /** 
         * @param {String} id - id of the entry to be removed
         * @returns {Boolean} - True if entry is removed, false if not or if there is no entry;
         */
        ListControl.prototype.remove = function (id) {
            var isRemoved = false, childToBeRemoved = DomUtil.getChildById(this.body, id);
            if (TypeCheck.isDefined(childToBeRemoved)) {
                isRemoved = true;
                this.body.removeChild(childToBeRemoved);
            }
            return isRemoved;
        };
        /** @returns {Boolean} - True if all entries are removed */
        ListControl.prototype.clear = function () {
            var body = this.body;
            while (body.firstChild) {
                body.removeChild(body.firstChild);
            }
            return true;
        };
        /** @returns {Boolean} - True if control is locked */
        ListControl.prototype.lock = function () {
            return false;
        };
        /** @returns {Boolean} - True if control is unlocked */
        ListControl.prototype.unlock = function () {
            return false;
        };
        /** 
         * @param {HTMLElement} entry - the entry node
         * @param {String} name - the name of the list element
         * @param {String} details - detail information of the list element
         */
        ListControl.prototype._setEntryValue = function (entry, name, details) {
            DomUtil.getChildByClass(entry, "name").innerHTML = name;
            DomUtil.getChildByClass(entry, "details").innerHTML = details;
        };
        /** 
         * @param {String} id - the id of the list element
         * @param {String} name - the name of the list element
         * @param {String} details - detail information of the list element
         * @returns {Boolean} - True if values are valid, false otherwise
         */
        ListControl.prototype._areValuesValid = function (id, name, details) {
            return TypeCheck.isString(id) && TypeCheck.isString(name) && TypeCheck.isString(details);
        };
        /** @param {Object} e - event object */
        ListControl.prototype._onEntryClick = function (e) {
            var entry = DomUtil.getAncestorByClass(e.target, "jean-list-element");
            if (TypeCheck.isDefined(entry)) {
                var value = entry.getAttribute("data-state"),
                    body = DomUtil.getChildByClass(entry, "body"),
                    separator = DomUtil.getChildByClass(entry, "separator"),
                    toggle = DomUtil.getChildByClass(entry, "toggle");
                switch (parseInt(value)) {
                    case this.ToggleValue.COLLAPSED:
                        // Display it
                        entry.setAttribute("data-state", this.ToggleValue.DISPLAYED);
                        separator.classList.remove("separator-invisible");
                        body.classList.remove("body-no-height");
                        toggle.innerHTML = "&and;";
                        break;
                    case this.ToggleValue.DISPLAYED:
                        // Collapse it
                        entry.setAttribute("data-state", this.ToggleValue.COLLAPSED);
                        separator.classList.add("separator-invisible");
                        body.classList.add("body-no-height");
                        toggle.innerHTML = "&or;";
                        break;
                }
            }
        };
        /** @param {Object} e - event object */
        ListControl.prototype._onScroll = function (e) {
            console.log("onscroll");
        };
        return ListControl;
    });