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
        /** */
        ListControl.prototype.commit = function () {
            this.body.appendChild(this._listElementFragment);
        };
        /** 
         * @throws {TypeError} - If id is not a string
         * @throws {TypeError} - If name is not a string
         * @throws {TypeError} - If details is not a string
         * @param {String} id - the id of the list element
         * @param {String} name - the name of the list element
         * @param {String} details - detail information of the list element
         */
        ListControl.prototype.add = function (id, name, details) {
            if (!this._areValuesValid(id, name, details)) {
                Failure.throwTypeError("provided values are invalid");
            }
            var listElement = this._listElement, entry = listElement.cloneNode(true),
                fragment = this._listElementFragment;
            entry.setAttribute("id", id);
            this._setEntryValue(entry, name, details);
            fragment.appendChild(entry);
            return true;
        };
        /** */
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
        /** */
        ListControl.prototype.remove = function () {

        };
        /** */
        ListControl.prototype.clear = function () {

        };
        /** */
        ListControl.prototype.lock = function () {

        };
        /** */
        ListControl.prototype.unlock = function () {

        };
        /** */
        ListControl.prototype._setEntryValue = function (node, name, details) {
            DomUtil.getChildByClass(node, "name").innerHTML = name;
            DomUtil.getChildByClass(node, "details").innerHTML = details;
        }
        /** */
        ListControl.prototype._areValuesValid = function (id, name, details) {
            return TypeCheck.isString(id) && TypeCheck.isString(name) && TypeCheck.isString(details);
        };
        /** */
        ListControl.prototype._onEntryClick = function (e) {
            var entry = DomUtil.getAncestorByClass(e.target, "jean-list-element"),
                value = entry.getAttribute("data-state"),
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
        };
        return ListControl;
    });