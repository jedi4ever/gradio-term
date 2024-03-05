function Kt(E) {
  return E && E.__esModule && Object.prototype.hasOwnProperty.call(E, "default") ? E.default : E;
}
var Mt = { exports: {} };
(function(E, m) {
  (function(S, y) {
    E.exports = y();
  })(self, () => (() => {
    var S = { 4567: function(k, t, n) {
      var o = this && this.__decorate || function(i, l, h, f) {
        var b, c = arguments.length, p = c < 3 ? l : f === null ? f = Object.getOwnPropertyDescriptor(l, h) : f;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          p = Reflect.decorate(i, l, h, f);
        else
          for (var L = i.length - 1; L >= 0; L--)
            (b = i[L]) && (p = (c < 3 ? b(p) : c > 3 ? b(l, h, p) : b(l, h)) || p);
        return c > 3 && p && Object.defineProperty(l, h, p), p;
      }, _ = this && this.__param || function(i, l) {
        return function(h, f) {
          l(h, f, i);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.AccessibilityManager = void 0;
      const a = n(9042), d = n(6114), v = n(9924), g = n(844), u = n(5596), e = n(4725), r = n(3656);
      let s = t.AccessibilityManager = class extends g.Disposable {
        constructor(i, l) {
          super(), this._terminal = i, this._renderService = l, this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "", this._accessibilityContainer = document.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = document.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
          for (let h = 0; h < this._terminal.rows; h++)
            this._rowElements[h] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[h]);
          if (this._topBoundaryFocusListener = (h) => this._handleBoundaryFocus(h, 0), this._bottomBoundaryFocusListener = (h) => this._handleBoundaryFocus(h, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions(), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = document.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this.register(new v.TimeBasedDebouncer(this._renderRows.bind(this))), !this._terminal.element)
            throw new Error("Cannot enable accessibility before Terminal.open");
          this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this.register(this._terminal.onResize((h) => this._handleResize(h.rows))), this.register(this._terminal.onRender((h) => this._refreshRows(h.start, h.end))), this.register(this._terminal.onScroll(() => this._refreshRows())), this.register(this._terminal.onA11yChar((h) => this._handleChar(h))), this.register(this._terminal.onLineFeed(() => this._handleChar(`
`))), this.register(this._terminal.onA11yTab((h) => this._handleTab(h))), this.register(this._terminal.onKey((h) => this._handleKey(h.key))), this.register(this._terminal.onBlur(() => this._clearLiveRegion())), this.register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this._screenDprMonitor = new u.ScreenDprMonitor(window), this.register(this._screenDprMonitor), this._screenDprMonitor.setListener(() => this._refreshRowsDimensions()), this.register((0, r.addDisposableDomListener)(window, "resize", () => this._refreshRowsDimensions())), this._refreshRows(), this.register((0, g.toDisposable)(() => {
            this._accessibilityContainer.remove(), this._rowElements.length = 0;
          }));
        }
        _handleTab(i) {
          for (let l = 0; l < i; l++)
            this._handleChar(" ");
        }
        _handleChar(i) {
          this._liveRegionLineCount < 21 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== i && (this._charsToAnnounce += i) : this._charsToAnnounce += i, i === `
` && (this._liveRegionLineCount++, this._liveRegionLineCount === 21 && (this._liveRegion.textContent += a.tooMuchOutput)), d.isMac && this._liveRegion.textContent && this._liveRegion.textContent.length > 0 && !this._liveRegion.parentNode && setTimeout(() => {
            this._accessibilityContainer.appendChild(this._liveRegion);
          }, 0));
        }
        _clearLiveRegion() {
          this._liveRegion.textContent = "", this._liveRegionLineCount = 0, d.isMac && this._liveRegion.remove();
        }
        _handleKey(i) {
          this._clearLiveRegion(), /\p{Control}/u.test(i) || this._charsToConsume.push(i);
        }
        _refreshRows(i, l) {
          this._liveRegionDebouncer.refresh(i, l, this._terminal.rows);
        }
        _renderRows(i, l) {
          const h = this._terminal.buffer, f = h.lines.length.toString();
          for (let b = i; b <= l; b++) {
            const c = h.translateBufferLineToString(h.ydisp + b, !0), p = (h.ydisp + b + 1).toString(), L = this._rowElements[b];
            L && (c.length === 0 ? L.innerText = " " : L.textContent = c, L.setAttribute("aria-posinset", p), L.setAttribute("aria-setsize", f));
          }
          this._announceCharacters();
        }
        _announceCharacters() {
          this._charsToAnnounce.length !== 0 && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
        }
        _handleBoundaryFocus(i, l) {
          const h = i.target, f = this._rowElements[l === 0 ? 1 : this._rowElements.length - 2];
          if (h.getAttribute("aria-posinset") === (l === 0 ? "1" : `${this._terminal.buffer.lines.length}`) || i.relatedTarget !== f)
            return;
          let b, c;
          if (l === 0 ? (b = h, c = this._rowElements.pop(), this._rowContainer.removeChild(c)) : (b = this._rowElements.shift(), c = h, this._rowContainer.removeChild(b)), b.removeEventListener("focus", this._topBoundaryFocusListener), c.removeEventListener("focus", this._bottomBoundaryFocusListener), l === 0) {
            const p = this._createAccessibilityTreeNode();
            this._rowElements.unshift(p), this._rowContainer.insertAdjacentElement("afterbegin", p);
          } else {
            const p = this._createAccessibilityTreeNode();
            this._rowElements.push(p), this._rowContainer.appendChild(p);
          }
          this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(l === 0 ? -1 : 1), this._rowElements[l === 0 ? 1 : this._rowElements.length - 2].focus(), i.preventDefault(), i.stopImmediatePropagation();
        }
        _handleResize(i) {
          this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
          for (let l = this._rowContainer.children.length; l < this._terminal.rows; l++)
            this._rowElements[l] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[l]);
          for (; this._rowElements.length > i; )
            this._rowContainer.removeChild(this._rowElements.pop());
          this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
        }
        _createAccessibilityTreeNode() {
          const i = document.createElement("div");
          return i.setAttribute("role", "listitem"), i.tabIndex = -1, this._refreshRowDimensions(i), i;
        }
        _refreshRowsDimensions() {
          if (this._renderService.dimensions.css.cell.height) {
            this._accessibilityContainer.style.width = `${this._renderService.dimensions.css.canvas.width}px`, this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
            for (let i = 0; i < this._terminal.rows; i++)
              this._refreshRowDimensions(this._rowElements[i]);
          }
        }
        _refreshRowDimensions(i) {
          i.style.height = `${this._renderService.dimensions.css.cell.height}px`;
        }
      };
      t.AccessibilityManager = s = o([_(1, e.IRenderService)], s);
    }, 3614: (k, t) => {
      function n(d) {
        return d.replace(/\r?\n/g, "\r");
      }
      function o(d, v) {
        return v ? "\x1B[200~" + d + "\x1B[201~" : d;
      }
      function _(d, v, g, u) {
        d = o(d = n(d), g.decPrivateModes.bracketedPasteMode && u.rawOptions.ignoreBracketedPasteMode !== !0), g.triggerDataEvent(d, !0), v.value = "";
      }
      function a(d, v, g) {
        const u = g.getBoundingClientRect(), e = d.clientX - u.left - 10, r = d.clientY - u.top - 10;
        v.style.width = "20px", v.style.height = "20px", v.style.left = `${e}px`, v.style.top = `${r}px`, v.style.zIndex = "1000", v.focus();
      }
      Object.defineProperty(t, "__esModule", { value: !0 }), t.rightClickHandler = t.moveTextAreaUnderMouseCursor = t.paste = t.handlePasteEvent = t.copyHandler = t.bracketTextForPaste = t.prepareTextForTerminal = void 0, t.prepareTextForTerminal = n, t.bracketTextForPaste = o, t.copyHandler = function(d, v) {
        d.clipboardData && d.clipboardData.setData("text/plain", v.selectionText), d.preventDefault();
      }, t.handlePasteEvent = function(d, v, g, u) {
        d.stopPropagation(), d.clipboardData && _(d.clipboardData.getData("text/plain"), v, g, u);
      }, t.paste = _, t.moveTextAreaUnderMouseCursor = a, t.rightClickHandler = function(d, v, g, u, e) {
        a(d, v, g), e && u.rightClickSelect(d), v.value = u.selectionText, v.select();
      };
    }, 7239: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ColorContrastCache = void 0;
      const o = n(1505);
      t.ColorContrastCache = class {
        constructor() {
          this._color = new o.TwoKeyMap(), this._css = new o.TwoKeyMap();
        }
        setCss(_, a, d) {
          this._css.set(_, a, d);
        }
        getCss(_, a) {
          return this._css.get(_, a);
        }
        setColor(_, a, d) {
          this._color.set(_, a, d);
        }
        getColor(_, a) {
          return this._color.get(_, a);
        }
        clear() {
          this._color.clear(), this._css.clear();
        }
      };
    }, 3656: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.addDisposableDomListener = void 0, t.addDisposableDomListener = function(n, o, _, a) {
        n.addEventListener(o, _, a);
        let d = !1;
        return { dispose: () => {
          d || (d = !0, n.removeEventListener(o, _, a));
        } };
      };
    }, 6465: function(k, t, n) {
      var o = this && this.__decorate || function(e, r, s, i) {
        var l, h = arguments.length, f = h < 3 ? r : i === null ? i = Object.getOwnPropertyDescriptor(r, s) : i;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          f = Reflect.decorate(e, r, s, i);
        else
          for (var b = e.length - 1; b >= 0; b--)
            (l = e[b]) && (f = (h < 3 ? l(f) : h > 3 ? l(r, s, f) : l(r, s)) || f);
        return h > 3 && f && Object.defineProperty(r, s, f), f;
      }, _ = this && this.__param || function(e, r) {
        return function(s, i) {
          r(s, i, e);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.Linkifier2 = void 0;
      const a = n(3656), d = n(8460), v = n(844), g = n(2585);
      let u = t.Linkifier2 = class extends v.Disposable {
        get currentLink() {
          return this._currentLink;
        }
        constructor(e) {
          super(), this._bufferService = e, this._linkProviders = [], this._linkCacheDisposables = [], this._isMouseOut = !0, this._wasResized = !1, this._activeLine = -1, this._onShowLinkUnderline = this.register(new d.EventEmitter()), this.onShowLinkUnderline = this._onShowLinkUnderline.event, this._onHideLinkUnderline = this.register(new d.EventEmitter()), this.onHideLinkUnderline = this._onHideLinkUnderline.event, this.register((0, v.getDisposeArrayDisposable)(this._linkCacheDisposables)), this.register((0, v.toDisposable)(() => {
            this._lastMouseEvent = void 0;
          })), this.register(this._bufferService.onResize(() => {
            this._clearCurrentLink(), this._wasResized = !0;
          }));
        }
        registerLinkProvider(e) {
          return this._linkProviders.push(e), { dispose: () => {
            const r = this._linkProviders.indexOf(e);
            r !== -1 && this._linkProviders.splice(r, 1);
          } };
        }
        attachToDom(e, r, s) {
          this._element = e, this._mouseService = r, this._renderService = s, this.register((0, a.addDisposableDomListener)(this._element, "mouseleave", () => {
            this._isMouseOut = !0, this._clearCurrentLink();
          })), this.register((0, a.addDisposableDomListener)(this._element, "mousemove", this._handleMouseMove.bind(this))), this.register((0, a.addDisposableDomListener)(this._element, "mousedown", this._handleMouseDown.bind(this))), this.register((0, a.addDisposableDomListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
        }
        _handleMouseMove(e) {
          if (this._lastMouseEvent = e, !this._element || !this._mouseService)
            return;
          const r = this._positionFromMouseEvent(e, this._element, this._mouseService);
          if (!r)
            return;
          this._isMouseOut = !1;
          const s = e.composedPath();
          for (let i = 0; i < s.length; i++) {
            const l = s[i];
            if (l.classList.contains("xterm"))
              break;
            if (l.classList.contains("xterm-hover"))
              return;
          }
          this._lastBufferCell && r.x === this._lastBufferCell.x && r.y === this._lastBufferCell.y || (this._handleHover(r), this._lastBufferCell = r);
        }
        _handleHover(e) {
          if (this._activeLine !== e.y || this._wasResized)
            return this._clearCurrentLink(), this._askForLink(e, !1), void (this._wasResized = !1);
          this._currentLink && this._linkAtPosition(this._currentLink.link, e) || (this._clearCurrentLink(), this._askForLink(e, !0));
        }
        _askForLink(e, r) {
          var s, i;
          this._activeProviderReplies && r || ((s = this._activeProviderReplies) === null || s === void 0 || s.forEach((h) => {
            h == null || h.forEach((f) => {
              f.link.dispose && f.link.dispose();
            });
          }), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e.y);
          let l = !1;
          for (const [h, f] of this._linkProviders.entries())
            r ? !((i = this._activeProviderReplies) === null || i === void 0) && i.get(h) && (l = this._checkLinkProviderResult(h, e, l)) : f.provideLinks(e.y, (b) => {
              var c, p;
              if (this._isMouseOut)
                return;
              const L = b == null ? void 0 : b.map((M) => ({ link: M }));
              (c = this._activeProviderReplies) === null || c === void 0 || c.set(h, L), l = this._checkLinkProviderResult(h, e, l), ((p = this._activeProviderReplies) === null || p === void 0 ? void 0 : p.size) === this._linkProviders.length && this._removeIntersectingLinks(e.y, this._activeProviderReplies);
            });
        }
        _removeIntersectingLinks(e, r) {
          const s = /* @__PURE__ */ new Set();
          for (let i = 0; i < r.size; i++) {
            const l = r.get(i);
            if (l)
              for (let h = 0; h < l.length; h++) {
                const f = l[h], b = f.link.range.start.y < e ? 0 : f.link.range.start.x, c = f.link.range.end.y > e ? this._bufferService.cols : f.link.range.end.x;
                for (let p = b; p <= c; p++) {
                  if (s.has(p)) {
                    l.splice(h--, 1);
                    break;
                  }
                  s.add(p);
                }
              }
          }
        }
        _checkLinkProviderResult(e, r, s) {
          var i;
          if (!this._activeProviderReplies)
            return s;
          const l = this._activeProviderReplies.get(e);
          let h = !1;
          for (let f = 0; f < e; f++)
            this._activeProviderReplies.has(f) && !this._activeProviderReplies.get(f) || (h = !0);
          if (!h && l) {
            const f = l.find((b) => this._linkAtPosition(b.link, r));
            f && (s = !0, this._handleNewLink(f));
          }
          if (this._activeProviderReplies.size === this._linkProviders.length && !s)
            for (let f = 0; f < this._activeProviderReplies.size; f++) {
              const b = (i = this._activeProviderReplies.get(f)) === null || i === void 0 ? void 0 : i.find((c) => this._linkAtPosition(c.link, r));
              if (b) {
                s = !0, this._handleNewLink(b);
                break;
              }
            }
          return s;
        }
        _handleMouseDown() {
          this._mouseDownLink = this._currentLink;
        }
        _handleMouseUp(e) {
          if (!this._element || !this._mouseService || !this._currentLink)
            return;
          const r = this._positionFromMouseEvent(e, this._element, this._mouseService);
          r && this._mouseDownLink === this._currentLink && this._linkAtPosition(this._currentLink.link, r) && this._currentLink.link.activate(e, this._currentLink.link.text);
        }
        _clearCurrentLink(e, r) {
          this._element && this._currentLink && this._lastMouseEvent && (!e || !r || this._currentLink.link.range.start.y >= e && this._currentLink.link.range.end.y <= r) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, (0, v.disposeArray)(this._linkCacheDisposables));
        }
        _handleNewLink(e) {
          if (!this._element || !this._lastMouseEvent || !this._mouseService)
            return;
          const r = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
          r && this._linkAtPosition(e.link, r) && (this._currentLink = e, this._currentLink.state = { decorations: { underline: e.link.decorations === void 0 || e.link.decorations.underline, pointerCursor: e.link.decorations === void 0 || e.link.decorations.pointerCursor }, isHovered: !0 }, this._linkHover(this._element, e.link, this._lastMouseEvent), e.link.decorations = {}, Object.defineProperties(e.link.decorations, { pointerCursor: { get: () => {
            var s, i;
            return (i = (s = this._currentLink) === null || s === void 0 ? void 0 : s.state) === null || i === void 0 ? void 0 : i.decorations.pointerCursor;
          }, set: (s) => {
            var i, l;
            !((i = this._currentLink) === null || i === void 0) && i.state && this._currentLink.state.decorations.pointerCursor !== s && (this._currentLink.state.decorations.pointerCursor = s, this._currentLink.state.isHovered && ((l = this._element) === null || l === void 0 || l.classList.toggle("xterm-cursor-pointer", s)));
          } }, underline: { get: () => {
            var s, i;
            return (i = (s = this._currentLink) === null || s === void 0 ? void 0 : s.state) === null || i === void 0 ? void 0 : i.decorations.underline;
          }, set: (s) => {
            var i, l, h;
            !((i = this._currentLink) === null || i === void 0) && i.state && ((h = (l = this._currentLink) === null || l === void 0 ? void 0 : l.state) === null || h === void 0 ? void 0 : h.decorations.underline) !== s && (this._currentLink.state.decorations.underline = s, this._currentLink.state.isHovered && this._fireUnderlineEvent(e.link, s));
          } } }), this._renderService && this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((s) => {
            if (!this._currentLink)
              return;
            const i = s.start === 0 ? 0 : s.start + 1 + this._bufferService.buffer.ydisp, l = this._bufferService.buffer.ydisp + 1 + s.end;
            if (this._currentLink.link.range.start.y >= i && this._currentLink.link.range.end.y <= l && (this._clearCurrentLink(i, l), this._lastMouseEvent && this._element)) {
              const h = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
              h && this._askForLink(h, !1);
            }
          })));
        }
        _linkHover(e, r, s) {
          var i;
          !((i = this._currentLink) === null || i === void 0) && i.state && (this._currentLink.state.isHovered = !0, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(r, !0), this._currentLink.state.decorations.pointerCursor && e.classList.add("xterm-cursor-pointer")), r.hover && r.hover(s, r.text);
        }
        _fireUnderlineEvent(e, r) {
          const s = e.range, i = this._bufferService.buffer.ydisp, l = this._createLinkUnderlineEvent(s.start.x - 1, s.start.y - i - 1, s.end.x, s.end.y - i - 1, void 0);
          (r ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(l);
        }
        _linkLeave(e, r, s) {
          var i;
          !((i = this._currentLink) === null || i === void 0) && i.state && (this._currentLink.state.isHovered = !1, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(r, !1), this._currentLink.state.decorations.pointerCursor && e.classList.remove("xterm-cursor-pointer")), r.leave && r.leave(s, r.text);
        }
        _linkAtPosition(e, r) {
          const s = e.range.start.y * this._bufferService.cols + e.range.start.x, i = e.range.end.y * this._bufferService.cols + e.range.end.x, l = r.y * this._bufferService.cols + r.x;
          return s <= l && l <= i;
        }
        _positionFromMouseEvent(e, r, s) {
          const i = s.getCoords(e, r, this._bufferService.cols, this._bufferService.rows);
          if (i)
            return { x: i[0], y: i[1] + this._bufferService.buffer.ydisp };
        }
        _createLinkUnderlineEvent(e, r, s, i, l) {
          return { x1: e, y1: r, x2: s, y2: i, cols: this._bufferService.cols, fg: l };
        }
      };
      t.Linkifier2 = u = o([_(0, g.IBufferService)], u);
    }, 9042: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.tooMuchOutput = t.promptLabel = void 0, t.promptLabel = "Terminal input", t.tooMuchOutput = "Too much output to announce, navigate to rows manually to read";
    }, 3730: function(k, t, n) {
      var o = this && this.__decorate || function(u, e, r, s) {
        var i, l = arguments.length, h = l < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, r) : s;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          h = Reflect.decorate(u, e, r, s);
        else
          for (var f = u.length - 1; f >= 0; f--)
            (i = u[f]) && (h = (l < 3 ? i(h) : l > 3 ? i(e, r, h) : i(e, r)) || h);
        return l > 3 && h && Object.defineProperty(e, r, h), h;
      }, _ = this && this.__param || function(u, e) {
        return function(r, s) {
          e(r, s, u);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.OscLinkProvider = void 0;
      const a = n(511), d = n(2585);
      let v = t.OscLinkProvider = class {
        constructor(u, e, r) {
          this._bufferService = u, this._optionsService = e, this._oscLinkService = r;
        }
        provideLinks(u, e) {
          var r;
          const s = this._bufferService.buffer.lines.get(u - 1);
          if (!s)
            return void e(void 0);
          const i = [], l = this._optionsService.rawOptions.linkHandler, h = new a.CellData(), f = s.getTrimmedLength();
          let b = -1, c = -1, p = !1;
          for (let L = 0; L < f; L++)
            if (c !== -1 || s.hasContent(L)) {
              if (s.loadCell(L, h), h.hasExtendedAttrs() && h.extended.urlId) {
                if (c === -1) {
                  c = L, b = h.extended.urlId;
                  continue;
                }
                p = h.extended.urlId !== b;
              } else
                c !== -1 && (p = !0);
              if (p || c !== -1 && L === f - 1) {
                const M = (r = this._oscLinkService.getLinkData(b)) === null || r === void 0 ? void 0 : r.uri;
                if (M) {
                  const D = { start: { x: c + 1, y: u }, end: { x: L + (p || L !== f - 1 ? 0 : 1), y: u } };
                  let T = !1;
                  if (!(l != null && l.allowNonHttpProtocols))
                    try {
                      const I = new URL(M);
                      ["http:", "https:"].includes(I.protocol) || (T = !0);
                    } catch {
                      T = !0;
                    }
                  T || i.push({ text: M, range: D, activate: (I, F) => l ? l.activate(I, F, D) : g(0, F), hover: (I, F) => {
                    var j;
                    return (j = l == null ? void 0 : l.hover) === null || j === void 0 ? void 0 : j.call(l, I, F, D);
                  }, leave: (I, F) => {
                    var j;
                    return (j = l == null ? void 0 : l.leave) === null || j === void 0 ? void 0 : j.call(l, I, F, D);
                  } });
                }
                p = !1, h.hasExtendedAttrs() && h.extended.urlId ? (c = L, b = h.extended.urlId) : (c = -1, b = -1);
              }
            }
          e(i);
        }
      };
      function g(u, e) {
        if (confirm(`Do you want to navigate to ${e}?

WARNING: This link could potentially be dangerous`)) {
          const r = window.open();
          if (r) {
            try {
              r.opener = null;
            } catch {
            }
            r.location.href = e;
          } else
            console.warn("Opening link blocked as opener could not be cleared");
        }
      }
      t.OscLinkProvider = v = o([_(0, d.IBufferService), _(1, d.IOptionsService), _(2, d.IOscLinkService)], v);
    }, 6193: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.RenderDebouncer = void 0, t.RenderDebouncer = class {
        constructor(n, o) {
          this._parentWindow = n, this._renderCallback = o, this._refreshCallbacks = [];
        }
        dispose() {
          this._animationFrame && (this._parentWindow.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
        }
        addRefreshCallback(n) {
          return this._refreshCallbacks.push(n), this._animationFrame || (this._animationFrame = this._parentWindow.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
        }
        refresh(n, o, _) {
          this._rowCount = _, n = n !== void 0 ? n : 0, o = o !== void 0 ? o : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, n) : n, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, o) : o, this._animationFrame || (this._animationFrame = this._parentWindow.requestAnimationFrame(() => this._innerRefresh()));
        }
        _innerRefresh() {
          if (this._animationFrame = void 0, this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0)
            return void this._runRefreshCallbacks();
          const n = Math.max(this._rowStart, 0), o = Math.min(this._rowEnd, this._rowCount - 1);
          this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(n, o), this._runRefreshCallbacks();
        }
        _runRefreshCallbacks() {
          for (const n of this._refreshCallbacks)
            n(0);
          this._refreshCallbacks = [];
        }
      };
    }, 5596: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ScreenDprMonitor = void 0;
      const o = n(844);
      class _ extends o.Disposable {
        constructor(d) {
          super(), this._parentWindow = d, this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this.register((0, o.toDisposable)(() => {
            this.clearListener();
          }));
        }
        setListener(d) {
          this._listener && this.clearListener(), this._listener = d, this._outerListener = () => {
            this._listener && (this._listener(this._parentWindow.devicePixelRatio, this._currentDevicePixelRatio), this._updateDpr());
          }, this._updateDpr();
        }
        _updateDpr() {
          var d;
          this._outerListener && ((d = this._resolutionMediaMatchList) === null || d === void 0 || d.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
        }
        clearListener() {
          this._resolutionMediaMatchList && this._listener && this._outerListener && (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._listener = void 0, this._outerListener = void 0);
        }
      }
      t.ScreenDprMonitor = _;
    }, 3236: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.Terminal = void 0;
      const o = n(3614), _ = n(3656), a = n(6465), d = n(9042), v = n(3730), g = n(1680), u = n(3107), e = n(5744), r = n(2950), s = n(1296), i = n(428), l = n(4269), h = n(5114), f = n(8934), b = n(3230), c = n(9312), p = n(4725), L = n(6731), M = n(8055), D = n(8969), T = n(8460), I = n(844), F = n(6114), j = n(8437), N = n(2584), C = n(7399), R = n(5941), A = n(9074), O = n(2585), z = n(5435), H = n(4567), V = typeof window < "u" ? window.document : null;
      class K extends D.CoreTerminal {
        get onFocus() {
          return this._onFocus.event;
        }
        get onBlur() {
          return this._onBlur.event;
        }
        get onA11yChar() {
          return this._onA11yCharEmitter.event;
        }
        get onA11yTab() {
          return this._onA11yTabEmitter.event;
        }
        get onWillOpen() {
          return this._onWillOpen.event;
        }
        constructor(w = {}) {
          super(w), this.browser = F, this._keyDownHandled = !1, this._keyDownSeen = !1, this._keyPressHandled = !1, this._unprocessedDeadKey = !1, this._accessibilityManager = this.register(new I.MutableDisposable()), this._onCursorMove = this.register(new T.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onKey = this.register(new T.EventEmitter()), this.onKey = this._onKey.event, this._onRender = this.register(new T.EventEmitter()), this.onRender = this._onRender.event, this._onSelectionChange = this.register(new T.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onTitleChange = this.register(new T.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onBell = this.register(new T.EventEmitter()), this.onBell = this._onBell.event, this._onFocus = this.register(new T.EventEmitter()), this._onBlur = this.register(new T.EventEmitter()), this._onA11yCharEmitter = this.register(new T.EventEmitter()), this._onA11yTabEmitter = this.register(new T.EventEmitter()), this._onWillOpen = this.register(new T.EventEmitter()), this._setup(), this.linkifier2 = this.register(this._instantiationService.createInstance(a.Linkifier2)), this.linkifier2.registerLinkProvider(this._instantiationService.createInstance(v.OscLinkProvider)), this._decorationService = this._instantiationService.createInstance(A.DecorationService), this._instantiationService.setService(O.IDecorationService, this._decorationService), this.register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this.register(this._inputHandler.onRequestRefreshRows((P, U) => this.refresh(P, U))), this.register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this.register(this._inputHandler.onRequestReset(() => this.reset())), this.register(this._inputHandler.onRequestWindowsOptionsReport((P) => this._reportWindowsOptions(P))), this.register(this._inputHandler.onColor((P) => this._handleColorEvent(P))), this.register((0, T.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove)), this.register((0, T.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange)), this.register((0, T.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this.register((0, T.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this.register(this._bufferService.onResize((P) => this._afterResize(P.cols, P.rows))), this.register((0, I.toDisposable)(() => {
            var P, U;
            this._customKeyEventHandler = void 0, (U = (P = this.element) === null || P === void 0 ? void 0 : P.parentNode) === null || U === void 0 || U.removeChild(this.element);
          }));
        }
        _handleColorEvent(w) {
          if (this._themeService)
            for (const P of w) {
              let U, W = "";
              switch (P.index) {
                case 256:
                  U = "foreground", W = "10";
                  break;
                case 257:
                  U = "background", W = "11";
                  break;
                case 258:
                  U = "cursor", W = "12";
                  break;
                default:
                  U = "ansi", W = "4;" + P.index;
              }
              switch (P.type) {
                case 0:
                  const G = M.color.toColorRGB(U === "ansi" ? this._themeService.colors.ansi[P.index] : this._themeService.colors[U]);
                  this.coreService.triggerDataEvent(`${N.C0.ESC}]${W};${(0, R.toRgbString)(G)}${N.C1_ESCAPED.ST}`);
                  break;
                case 1:
                  if (U === "ansi")
                    this._themeService.modifyColors((q) => q.ansi[P.index] = M.rgba.toColor(...P.color));
                  else {
                    const q = U;
                    this._themeService.modifyColors(($) => $[q] = M.rgba.toColor(...P.color));
                  }
                  break;
                case 2:
                  this._themeService.restoreColor(P.index);
              }
            }
        }
        _setup() {
          super._setup(), this._customKeyEventHandler = void 0;
        }
        get buffer() {
          return this.buffers.active;
        }
        focus() {
          this.textarea && this.textarea.focus({ preventScroll: !0 });
        }
        _handleScreenReaderModeOptionChange(w) {
          w ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(H.AccessibilityManager, this)) : this._accessibilityManager.clear();
        }
        _handleTextAreaFocus(w) {
          this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(N.C0.ESC + "[I"), this.updateCursorStyle(w), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
        }
        blur() {
          var w;
          return (w = this.textarea) === null || w === void 0 ? void 0 : w.blur();
        }
        _handleTextAreaBlur() {
          this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(N.C0.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
        }
        _syncTextArea() {
          if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService)
            return;
          const w = this.buffer.ybase + this.buffer.y, P = this.buffer.lines.get(w);
          if (!P)
            return;
          const U = Math.min(this.buffer.x, this.cols - 1), W = this._renderService.dimensions.css.cell.height, G = P.getWidth(U), q = this._renderService.dimensions.css.cell.width * G, $ = this.buffer.y * this._renderService.dimensions.css.cell.height, ie = U * this._renderService.dimensions.css.cell.width;
          this.textarea.style.left = ie + "px", this.textarea.style.top = $ + "px", this.textarea.style.width = q + "px", this.textarea.style.height = W + "px", this.textarea.style.lineHeight = W + "px", this.textarea.style.zIndex = "-5";
        }
        _initGlobal() {
          this._bindKeys(), this.register((0, _.addDisposableDomListener)(this.element, "copy", (P) => {
            this.hasSelection() && (0, o.copyHandler)(P, this._selectionService);
          }));
          const w = (P) => (0, o.handlePasteEvent)(P, this.textarea, this.coreService, this.optionsService);
          this.register((0, _.addDisposableDomListener)(this.textarea, "paste", w)), this.register((0, _.addDisposableDomListener)(this.element, "paste", w)), F.isFirefox ? this.register((0, _.addDisposableDomListener)(this.element, "mousedown", (P) => {
            P.button === 2 && (0, o.rightClickHandler)(P, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
          })) : this.register((0, _.addDisposableDomListener)(this.element, "contextmenu", (P) => {
            (0, o.rightClickHandler)(P, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
          })), F.isLinux && this.register((0, _.addDisposableDomListener)(this.element, "auxclick", (P) => {
            P.button === 1 && (0, o.moveTextAreaUnderMouseCursor)(P, this.textarea, this.screenElement);
          }));
        }
        _bindKeys() {
          this.register((0, _.addDisposableDomListener)(this.textarea, "keyup", (w) => this._keyUp(w), !0)), this.register((0, _.addDisposableDomListener)(this.textarea, "keydown", (w) => this._keyDown(w), !0)), this.register((0, _.addDisposableDomListener)(this.textarea, "keypress", (w) => this._keyPress(w), !0)), this.register((0, _.addDisposableDomListener)(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this.register((0, _.addDisposableDomListener)(this.textarea, "compositionupdate", (w) => this._compositionHelper.compositionupdate(w))), this.register((0, _.addDisposableDomListener)(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this.register((0, _.addDisposableDomListener)(this.textarea, "input", (w) => this._inputEvent(w), !0)), this.register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
        }
        open(w) {
          var P;
          if (!w)
            throw new Error("Terminal requires a parent element.");
          w.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this._document = w.ownerDocument, this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), w.appendChild(this.element);
          const U = V.createDocumentFragment();
          this._viewportElement = V.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), U.appendChild(this._viewportElement), this._viewportScrollArea = V.createElement("div"), this._viewportScrollArea.classList.add("xterm-scroll-area"), this._viewportElement.appendChild(this._viewportScrollArea), this.screenElement = V.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._helperContainer = V.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), U.appendChild(this.screenElement), this.textarea = V.createElement("textarea"), this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", d.promptLabel), F.isChromeOS || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._coreBrowserService = this._instantiationService.createInstance(h.CoreBrowserService, this.textarea, (P = this._document.defaultView) !== null && P !== void 0 ? P : window), this._instantiationService.setService(p.ICoreBrowserService, this._coreBrowserService), this.register((0, _.addDisposableDomListener)(this.textarea, "focus", (W) => this._handleTextAreaFocus(W))), this.register((0, _.addDisposableDomListener)(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(i.CharSizeService, this._document, this._helperContainer), this._instantiationService.setService(p.ICharSizeService, this._charSizeService), this._themeService = this._instantiationService.createInstance(L.ThemeService), this._instantiationService.setService(p.IThemeService, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(l.CharacterJoinerService), this._instantiationService.setService(p.ICharacterJoinerService, this._characterJoinerService), this._renderService = this.register(this._instantiationService.createInstance(b.RenderService, this.rows, this.screenElement)), this._instantiationService.setService(p.IRenderService, this._renderService), this.register(this._renderService.onRenderedViewportChange((W) => this._onRender.fire(W))), this.onResize((W) => this._renderService.resize(W.cols, W.rows)), this._compositionView = V.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(r.CompositionHelper, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this.element.appendChild(U);
          try {
            this._onWillOpen.fire(this.element);
          } catch {
          }
          this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._mouseService = this._instantiationService.createInstance(f.MouseService), this._instantiationService.setService(p.IMouseService, this._mouseService), this.viewport = this._instantiationService.createInstance(g.Viewport, this._viewportElement, this._viewportScrollArea), this.viewport.onRequestScrollLines((W) => this.scrollLines(W.amount, W.suppressScrollEvent, 1)), this.register(this._inputHandler.onRequestSyncScrollBar(() => this.viewport.syncScrollArea())), this.register(this.viewport), this.register(this.onCursorMove(() => {
            this._renderService.handleCursorMove(), this._syncTextArea();
          })), this.register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this.register(this.onBlur(() => this._renderService.handleBlur())), this.register(this.onFocus(() => this._renderService.handleFocus())), this.register(this._renderService.onDimensionsChange(() => this.viewport.syncScrollArea())), this._selectionService = this.register(this._instantiationService.createInstance(c.SelectionService, this.element, this.screenElement, this.linkifier2)), this._instantiationService.setService(p.ISelectionService, this._selectionService), this.register(this._selectionService.onRequestScrollLines((W) => this.scrollLines(W.amount, W.suppressScrollEvent))), this.register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this.register(this._selectionService.onRequestRedraw((W) => this._renderService.handleSelectionChanged(W.start, W.end, W.columnSelectMode))), this.register(this._selectionService.onLinuxMouseSelection((W) => {
            this.textarea.value = W, this.textarea.focus(), this.textarea.select();
          })), this.register(this._onScroll.event((W) => {
            this.viewport.syncScrollArea(), this._selectionService.refresh();
          })), this.register((0, _.addDisposableDomListener)(this._viewportElement, "scroll", () => this._selectionService.refresh())), this.linkifier2.attachToDom(this.screenElement, this._mouseService, this._renderService), this.register(this._instantiationService.createInstance(u.BufferDecorationRenderer, this.screenElement)), this.register((0, _.addDisposableDomListener)(this.element, "mousedown", (W) => this._selectionService.handleMouseDown(W))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(H.AccessibilityManager, this)), this.register(this.optionsService.onSpecificOptionChange("screenReaderMode", (W) => this._handleScreenReaderModeOptionChange(W))), this.options.overviewRulerWidth && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(e.OverviewRulerRenderer, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRulerWidth", (W) => {
            !this._overviewRulerRenderer && W && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(e.OverviewRulerRenderer, this._viewportElement, this.screenElement)));
          }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
        }
        _createRenderer() {
          return this._instantiationService.createInstance(s.DomRenderer, this.element, this.screenElement, this._viewportElement, this.linkifier2);
        }
        bindMouse() {
          const w = this, P = this.element;
          function U(q) {
            const $ = w._mouseService.getMouseReportCoords(q, w.screenElement);
            if (!$)
              return !1;
            let ie, se;
            switch (q.overrideType || q.type) {
              case "mousemove":
                se = 32, q.buttons === void 0 ? (ie = 3, q.button !== void 0 && (ie = q.button < 3 ? q.button : 3)) : ie = 1 & q.buttons ? 0 : 4 & q.buttons ? 1 : 2 & q.buttons ? 2 : 3;
                break;
              case "mouseup":
                se = 0, ie = q.button < 3 ? q.button : 3;
                break;
              case "mousedown":
                se = 1, ie = q.button < 3 ? q.button : 3;
                break;
              case "wheel":
                if (w.viewport.getLinesScrolled(q) === 0)
                  return !1;
                se = q.deltaY < 0 ? 0 : 1, ie = 4;
                break;
              default:
                return !1;
            }
            return !(se === void 0 || ie === void 0 || ie > 4) && w.coreMouseService.triggerMouseEvent({ col: $.col, row: $.row, x: $.x, y: $.y, button: ie, action: se, ctrl: q.ctrlKey, alt: q.altKey, shift: q.shiftKey });
          }
          const W = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, G = { mouseup: (q) => (U(q), q.buttons || (this._document.removeEventListener("mouseup", W.mouseup), W.mousedrag && this._document.removeEventListener("mousemove", W.mousedrag)), this.cancel(q)), wheel: (q) => (U(q), this.cancel(q, !0)), mousedrag: (q) => {
            q.buttons && U(q);
          }, mousemove: (q) => {
            q.buttons || U(q);
          } };
          this.register(this.coreMouseService.onProtocolChange((q) => {
            q ? (this.optionsService.rawOptions.logLevel === "debug" && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(q)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), 8 & q ? W.mousemove || (P.addEventListener("mousemove", G.mousemove), W.mousemove = G.mousemove) : (P.removeEventListener("mousemove", W.mousemove), W.mousemove = null), 16 & q ? W.wheel || (P.addEventListener("wheel", G.wheel, { passive: !1 }), W.wheel = G.wheel) : (P.removeEventListener("wheel", W.wheel), W.wheel = null), 2 & q ? W.mouseup || (P.addEventListener("mouseup", G.mouseup), W.mouseup = G.mouseup) : (this._document.removeEventListener("mouseup", W.mouseup), P.removeEventListener("mouseup", W.mouseup), W.mouseup = null), 4 & q ? W.mousedrag || (W.mousedrag = G.mousedrag) : (this._document.removeEventListener("mousemove", W.mousedrag), W.mousedrag = null);
          })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this.register((0, _.addDisposableDomListener)(P, "mousedown", (q) => {
            if (q.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(q))
              return U(q), W.mouseup && this._document.addEventListener("mouseup", W.mouseup), W.mousedrag && this._document.addEventListener("mousemove", W.mousedrag), this.cancel(q);
          })), this.register((0, _.addDisposableDomListener)(P, "wheel", (q) => {
            if (!W.wheel) {
              if (!this.buffer.hasScrollback) {
                const $ = this.viewport.getLinesScrolled(q);
                if ($ === 0)
                  return;
                const ie = N.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (q.deltaY < 0 ? "A" : "B");
                let se = "";
                for (let be = 0; be < Math.abs($); be++)
                  se += ie;
                return this.coreService.triggerDataEvent(se, !0), this.cancel(q, !0);
              }
              return this.viewport.handleWheel(q) ? this.cancel(q) : void 0;
            }
          }, { passive: !1 })), this.register((0, _.addDisposableDomListener)(P, "touchstart", (q) => {
            if (!this.coreMouseService.areMouseEventsActive)
              return this.viewport.handleTouchStart(q), this.cancel(q);
          }, { passive: !0 })), this.register((0, _.addDisposableDomListener)(P, "touchmove", (q) => {
            if (!this.coreMouseService.areMouseEventsActive)
              return this.viewport.handleTouchMove(q) ? void 0 : this.cancel(q);
          }, { passive: !1 }));
        }
        refresh(w, P) {
          var U;
          (U = this._renderService) === null || U === void 0 || U.refreshRows(w, P);
        }
        updateCursorStyle(w) {
          var P;
          !((P = this._selectionService) === null || P === void 0) && P.shouldColumnSelect(w) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
        }
        _showCursor() {
          this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = !0, this.refresh(this.buffer.y, this.buffer.y));
        }
        scrollLines(w, P, U = 0) {
          var W;
          U === 1 ? (super.scrollLines(w, P, U), this.refresh(0, this.rows - 1)) : (W = this.viewport) === null || W === void 0 || W.scrollLines(w);
        }
        paste(w) {
          (0, o.paste)(w, this.textarea, this.coreService, this.optionsService);
        }
        attachCustomKeyEventHandler(w) {
          this._customKeyEventHandler = w;
        }
        registerLinkProvider(w) {
          return this.linkifier2.registerLinkProvider(w);
        }
        registerCharacterJoiner(w) {
          if (!this._characterJoinerService)
            throw new Error("Terminal must be opened first");
          const P = this._characterJoinerService.register(w);
          return this.refresh(0, this.rows - 1), P;
        }
        deregisterCharacterJoiner(w) {
          if (!this._characterJoinerService)
            throw new Error("Terminal must be opened first");
          this._characterJoinerService.deregister(w) && this.refresh(0, this.rows - 1);
        }
        get markers() {
          return this.buffer.markers;
        }
        registerMarker(w) {
          return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + w);
        }
        registerDecoration(w) {
          return this._decorationService.registerDecoration(w);
        }
        hasSelection() {
          return !!this._selectionService && this._selectionService.hasSelection;
        }
        select(w, P, U) {
          this._selectionService.setSelection(w, P, U);
        }
        getSelection() {
          return this._selectionService ? this._selectionService.selectionText : "";
        }
        getSelectionPosition() {
          if (this._selectionService && this._selectionService.hasSelection)
            return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
        }
        clearSelection() {
          var w;
          (w = this._selectionService) === null || w === void 0 || w.clearSelection();
        }
        selectAll() {
          var w;
          (w = this._selectionService) === null || w === void 0 || w.selectAll();
        }
        selectLines(w, P) {
          var U;
          (U = this._selectionService) === null || U === void 0 || U.selectLines(w, P);
        }
        _keyDown(w) {
          if (this._keyDownHandled = !1, this._keyDownSeen = !0, this._customKeyEventHandler && this._customKeyEventHandler(w) === !1)
            return !1;
          const P = this.browser.isMac && this.options.macOptionIsMeta && w.altKey;
          if (!P && !this._compositionHelper.keydown(w))
            return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(), !1;
          P || w.key !== "Dead" && w.key !== "AltGraph" || (this._unprocessedDeadKey = !0);
          const U = (0, C.evaluateKeyboardEvent)(w, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
          if (this.updateCursorStyle(w), U.type === 3 || U.type === 2) {
            const W = this.rows - 1;
            return this.scrollLines(U.type === 2 ? -W : W), this.cancel(w, !0);
          }
          return U.type === 1 && this.selectAll(), !!this._isThirdLevelShift(this.browser, w) || (U.cancel && this.cancel(w, !0), !U.key || !!(w.key && !w.ctrlKey && !w.altKey && !w.metaKey && w.key.length === 1 && w.key.charCodeAt(0) >= 65 && w.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = !1, !0) : (U.key !== N.C0.ETX && U.key !== N.C0.CR || (this.textarea.value = ""), this._onKey.fire({ key: U.key, domEvent: w }), this._showCursor(), this.coreService.triggerDataEvent(U.key, !0), !this.optionsService.rawOptions.screenReaderMode || w.altKey || w.ctrlKey ? this.cancel(w, !0) : void (this._keyDownHandled = !0))));
        }
        _isThirdLevelShift(w, P) {
          const U = w.isMac && !this.options.macOptionIsMeta && P.altKey && !P.ctrlKey && !P.metaKey || w.isWindows && P.altKey && P.ctrlKey && !P.metaKey || w.isWindows && P.getModifierState("AltGraph");
          return P.type === "keypress" ? U : U && (!P.keyCode || P.keyCode > 47);
        }
        _keyUp(w) {
          this._keyDownSeen = !1, this._customKeyEventHandler && this._customKeyEventHandler(w) === !1 || (function(P) {
            return P.keyCode === 16 || P.keyCode === 17 || P.keyCode === 18;
          }(w) || this.focus(), this.updateCursorStyle(w), this._keyPressHandled = !1);
        }
        _keyPress(w) {
          let P;
          if (this._keyPressHandled = !1, this._keyDownHandled || this._customKeyEventHandler && this._customKeyEventHandler(w) === !1)
            return !1;
          if (this.cancel(w), w.charCode)
            P = w.charCode;
          else if (w.which === null || w.which === void 0)
            P = w.keyCode;
          else {
            if (w.which === 0 || w.charCode === 0)
              return !1;
            P = w.which;
          }
          return !(!P || (w.altKey || w.ctrlKey || w.metaKey) && !this._isThirdLevelShift(this.browser, w) || (P = String.fromCharCode(P), this._onKey.fire({ key: P, domEvent: w }), this._showCursor(), this.coreService.triggerDataEvent(P, !0), this._keyPressHandled = !0, this._unprocessedDeadKey = !1, 0));
        }
        _inputEvent(w) {
          if (w.data && w.inputType === "insertText" && (!w.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
            if (this._keyPressHandled)
              return !1;
            this._unprocessedDeadKey = !1;
            const P = w.data;
            return this.coreService.triggerDataEvent(P, !0), this.cancel(w), !0;
          }
          return !1;
        }
        resize(w, P) {
          w !== this.cols || P !== this.rows ? super.resize(w, P) : this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
        }
        _afterResize(w, P) {
          var U, W;
          (U = this._charSizeService) === null || U === void 0 || U.measure(), (W = this.viewport) === null || W === void 0 || W.syncScrollArea(!0);
        }
        clear() {
          var w;
          if (this.buffer.ybase !== 0 || this.buffer.y !== 0) {
            this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
            for (let P = 1; P < this.rows; P++)
              this.buffer.lines.push(this.buffer.getBlankLine(j.DEFAULT_ATTR_DATA));
            this._onScroll.fire({ position: this.buffer.ydisp, source: 0 }), (w = this.viewport) === null || w === void 0 || w.reset(), this.refresh(0, this.rows - 1);
          }
        }
        reset() {
          var w, P;
          this.options.rows = this.rows, this.options.cols = this.cols;
          const U = this._customKeyEventHandler;
          this._setup(), super.reset(), (w = this._selectionService) === null || w === void 0 || w.reset(), this._decorationService.reset(), (P = this.viewport) === null || P === void 0 || P.reset(), this._customKeyEventHandler = U, this.refresh(0, this.rows - 1);
        }
        clearTextureAtlas() {
          var w;
          (w = this._renderService) === null || w === void 0 || w.clearTextureAtlas();
        }
        _reportFocus() {
          var w;
          !((w = this.element) === null || w === void 0) && w.classList.contains("focus") ? this.coreService.triggerDataEvent(N.C0.ESC + "[I") : this.coreService.triggerDataEvent(N.C0.ESC + "[O");
        }
        _reportWindowsOptions(w) {
          if (this._renderService)
            switch (w) {
              case z.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
                const P = this._renderService.dimensions.css.canvas.width.toFixed(0), U = this._renderService.dimensions.css.canvas.height.toFixed(0);
                this.coreService.triggerDataEvent(`${N.C0.ESC}[4;${U};${P}t`);
                break;
              case z.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
                const W = this._renderService.dimensions.css.cell.width.toFixed(0), G = this._renderService.dimensions.css.cell.height.toFixed(0);
                this.coreService.triggerDataEvent(`${N.C0.ESC}[6;${G};${W}t`);
            }
        }
        cancel(w, P) {
          if (this.options.cancelEvents || P)
            return w.preventDefault(), w.stopPropagation(), !1;
        }
      }
      t.Terminal = K;
    }, 9924: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.TimeBasedDebouncer = void 0, t.TimeBasedDebouncer = class {
        constructor(n, o = 1e3) {
          this._renderCallback = n, this._debounceThresholdMS = o, this._lastRefreshMs = 0, this._additionalRefreshRequested = !1;
        }
        dispose() {
          this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
        }
        refresh(n, o, _) {
          this._rowCount = _, n = n !== void 0 ? n : 0, o = o !== void 0 ? o : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, n) : n, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, o) : o;
          const a = Date.now();
          if (a - this._lastRefreshMs >= this._debounceThresholdMS)
            this._lastRefreshMs = a, this._innerRefresh();
          else if (!this._additionalRefreshRequested) {
            const d = a - this._lastRefreshMs, v = this._debounceThresholdMS - d;
            this._additionalRefreshRequested = !0, this._refreshTimeoutID = window.setTimeout(() => {
              this._lastRefreshMs = Date.now(), this._innerRefresh(), this._additionalRefreshRequested = !1, this._refreshTimeoutID = void 0;
            }, v);
          }
        }
        _innerRefresh() {
          if (this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0)
            return;
          const n = Math.max(this._rowStart, 0), o = Math.min(this._rowEnd, this._rowCount - 1);
          this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(n, o);
        }
      };
    }, 1680: function(k, t, n) {
      var o = this && this.__decorate || function(r, s, i, l) {
        var h, f = arguments.length, b = f < 3 ? s : l === null ? l = Object.getOwnPropertyDescriptor(s, i) : l;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          b = Reflect.decorate(r, s, i, l);
        else
          for (var c = r.length - 1; c >= 0; c--)
            (h = r[c]) && (b = (f < 3 ? h(b) : f > 3 ? h(s, i, b) : h(s, i)) || b);
        return f > 3 && b && Object.defineProperty(s, i, b), b;
      }, _ = this && this.__param || function(r, s) {
        return function(i, l) {
          s(i, l, r);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.Viewport = void 0;
      const a = n(3656), d = n(4725), v = n(8460), g = n(844), u = n(2585);
      let e = t.Viewport = class extends g.Disposable {
        constructor(r, s, i, l, h, f, b, c) {
          super(), this._viewportElement = r, this._scrollArea = s, this._bufferService = i, this._optionsService = l, this._charSizeService = h, this._renderService = f, this._coreBrowserService = b, this.scrollBarWidth = 0, this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._wheelPartialScroll = 0, this._refreshAnimationFrame = null, this._ignoreNextScrollEvent = !1, this._smoothScrollState = { startTime: 0, origin: -1, target: -1 }, this._onRequestScrollLines = this.register(new v.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this.scrollBarWidth = this._viewportElement.offsetWidth - this._scrollArea.offsetWidth || 15, this.register((0, a.addDisposableDomListener)(this._viewportElement, "scroll", this._handleScroll.bind(this))), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((p) => this._activeBuffer = p.activeBuffer)), this._renderDimensions = this._renderService.dimensions, this.register(this._renderService.onDimensionsChange((p) => this._renderDimensions = p)), this._handleThemeChange(c.colors), this.register(c.onChangeColors((p) => this._handleThemeChange(p))), this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.syncScrollArea())), setTimeout(() => this.syncScrollArea());
        }
        _handleThemeChange(r) {
          this._viewportElement.style.backgroundColor = r.background.css;
        }
        reset() {
          this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._coreBrowserService.window.requestAnimationFrame(() => this.syncScrollArea());
        }
        _refresh(r) {
          if (r)
            return this._innerRefresh(), void (this._refreshAnimationFrame !== null && this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));
          this._refreshAnimationFrame === null && (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
        }
        _innerRefresh() {
          if (this._charSizeService.height > 0) {
            this._currentRowHeight = this._renderService.dimensions.device.cell.height / this._coreBrowserService.dpr, this._currentDeviceCellHeight = this._renderService.dimensions.device.cell.height, this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
            const s = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderService.dimensions.css.canvas.height);
            this._lastRecordedBufferHeight !== s && (this._lastRecordedBufferHeight = s, this._scrollArea.style.height = this._lastRecordedBufferHeight + "px");
          }
          const r = this._bufferService.buffer.ydisp * this._currentRowHeight;
          this._viewportElement.scrollTop !== r && (this._ignoreNextScrollEvent = !0, this._viewportElement.scrollTop = r), this._refreshAnimationFrame = null;
        }
        syncScrollArea(r = !1) {
          if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length)
            return this._lastRecordedBufferLength = this._bufferService.buffer.lines.length, void this._refresh(r);
          this._lastRecordedViewportHeight === this._renderService.dimensions.css.canvas.height && this._lastScrollTop === this._activeBuffer.ydisp * this._currentRowHeight && this._renderDimensions.device.cell.height === this._currentDeviceCellHeight || this._refresh(r);
        }
        _handleScroll(r) {
          if (this._lastScrollTop = this._viewportElement.scrollTop, !this._viewportElement.offsetParent)
            return;
          if (this._ignoreNextScrollEvent)
            return this._ignoreNextScrollEvent = !1, void this._onRequestScrollLines.fire({ amount: 0, suppressScrollEvent: !0 });
          const s = Math.round(this._lastScrollTop / this._currentRowHeight) - this._bufferService.buffer.ydisp;
          this._onRequestScrollLines.fire({ amount: s, suppressScrollEvent: !0 });
        }
        _smoothScroll() {
          if (this._isDisposed || this._smoothScrollState.origin === -1 || this._smoothScrollState.target === -1)
            return;
          const r = this._smoothScrollPercent();
          this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(r * (this._smoothScrollState.target - this._smoothScrollState.origin)), r < 1 ? this._coreBrowserService.window.requestAnimationFrame(() => this._smoothScroll()) : this._clearSmoothScrollState();
        }
        _smoothScrollPercent() {
          return this._optionsService.rawOptions.smoothScrollDuration && this._smoothScrollState.startTime ? Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0) : 1;
        }
        _clearSmoothScrollState() {
          this._smoothScrollState.startTime = 0, this._smoothScrollState.origin = -1, this._smoothScrollState.target = -1;
        }
        _bubbleScroll(r, s) {
          const i = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
          return !(s < 0 && this._viewportElement.scrollTop !== 0 || s > 0 && i < this._lastRecordedBufferHeight) || (r.cancelable && r.preventDefault(), !1);
        }
        handleWheel(r) {
          const s = this._getPixelsScrolled(r);
          return s !== 0 && (this._optionsService.rawOptions.smoothScrollDuration ? (this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target === -1 ? this._smoothScrollState.target = this._viewportElement.scrollTop + s : this._smoothScrollState.target += s, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState()) : this._viewportElement.scrollTop += s, this._bubbleScroll(r, s));
        }
        scrollLines(r) {
          if (r !== 0)
            if (this._optionsService.rawOptions.smoothScrollDuration) {
              const s = r * this._currentRowHeight;
              this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target = this._smoothScrollState.origin + s, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState();
            } else
              this._onRequestScrollLines.fire({ amount: r, suppressScrollEvent: !1 });
        }
        _getPixelsScrolled(r) {
          if (r.deltaY === 0 || r.shiftKey)
            return 0;
          let s = this._applyScrollModifier(r.deltaY, r);
          return r.deltaMode === WheelEvent.DOM_DELTA_LINE ? s *= this._currentRowHeight : r.deltaMode === WheelEvent.DOM_DELTA_PAGE && (s *= this._currentRowHeight * this._bufferService.rows), s;
        }
        getBufferElements(r, s) {
          var i;
          let l, h = "";
          const f = [], b = s ?? this._bufferService.buffer.lines.length, c = this._bufferService.buffer.lines;
          for (let p = r; p < b; p++) {
            const L = c.get(p);
            if (!L)
              continue;
            const M = (i = c.get(p + 1)) === null || i === void 0 ? void 0 : i.isWrapped;
            if (h += L.translateToString(!M), !M || p === c.length - 1) {
              const D = document.createElement("div");
              D.textContent = h, f.push(D), h.length > 0 && (l = D), h = "";
            }
          }
          return { bufferElements: f, cursorElement: l };
        }
        getLinesScrolled(r) {
          if (r.deltaY === 0 || r.shiftKey)
            return 0;
          let s = this._applyScrollModifier(r.deltaY, r);
          return r.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (s /= this._currentRowHeight + 0, this._wheelPartialScroll += s, s = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : r.deltaMode === WheelEvent.DOM_DELTA_PAGE && (s *= this._bufferService.rows), s;
        }
        _applyScrollModifier(r, s) {
          const i = this._optionsService.rawOptions.fastScrollModifier;
          return i === "alt" && s.altKey || i === "ctrl" && s.ctrlKey || i === "shift" && s.shiftKey ? r * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : r * this._optionsService.rawOptions.scrollSensitivity;
        }
        handleTouchStart(r) {
          this._lastTouchY = r.touches[0].pageY;
        }
        handleTouchMove(r) {
          const s = this._lastTouchY - r.touches[0].pageY;
          return this._lastTouchY = r.touches[0].pageY, s !== 0 && (this._viewportElement.scrollTop += s, this._bubbleScroll(r, s));
        }
      };
      t.Viewport = e = o([_(2, u.IBufferService), _(3, u.IOptionsService), _(4, d.ICharSizeService), _(5, d.IRenderService), _(6, d.ICoreBrowserService), _(7, d.IThemeService)], e);
    }, 3107: function(k, t, n) {
      var o = this && this.__decorate || function(e, r, s, i) {
        var l, h = arguments.length, f = h < 3 ? r : i === null ? i = Object.getOwnPropertyDescriptor(r, s) : i;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          f = Reflect.decorate(e, r, s, i);
        else
          for (var b = e.length - 1; b >= 0; b--)
            (l = e[b]) && (f = (h < 3 ? l(f) : h > 3 ? l(r, s, f) : l(r, s)) || f);
        return h > 3 && f && Object.defineProperty(r, s, f), f;
      }, _ = this && this.__param || function(e, r) {
        return function(s, i) {
          r(s, i, e);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferDecorationRenderer = void 0;
      const a = n(3656), d = n(4725), v = n(844), g = n(2585);
      let u = t.BufferDecorationRenderer = class extends v.Disposable {
        constructor(e, r, s, i) {
          super(), this._screenElement = e, this._bufferService = r, this._decorationService = s, this._renderService = i, this._decorationElements = /* @__PURE__ */ new Map(), this._altBufferIsActive = !1, this._dimensionsChanged = !1, this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this.register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this.register(this._renderService.onDimensionsChange(() => {
            this._dimensionsChanged = !0, this._queueRefresh();
          })), this.register((0, a.addDisposableDomListener)(window, "resize", () => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
            this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
          })), this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this.register(this._decorationService.onDecorationRemoved((l) => this._removeDecoration(l))), this.register((0, v.toDisposable)(() => {
            this._container.remove(), this._decorationElements.clear();
          }));
        }
        _queueRefresh() {
          this._animationFrame === void 0 && (this._animationFrame = this._renderService.addRefreshCallback(() => {
            this._doRefreshDecorations(), this._animationFrame = void 0;
          }));
        }
        _doRefreshDecorations() {
          for (const e of this._decorationService.decorations)
            this._renderDecoration(e);
          this._dimensionsChanged = !1;
        }
        _renderDecoration(e) {
          this._refreshStyle(e), this._dimensionsChanged && this._refreshXPosition(e);
        }
        _createElement(e) {
          var r, s;
          const i = document.createElement("div");
          i.classList.add("xterm-decoration"), i.classList.toggle("xterm-decoration-top-layer", ((r = e == null ? void 0 : e.options) === null || r === void 0 ? void 0 : r.layer) === "top"), i.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, i.style.height = (e.options.height || 1) * this._renderService.dimensions.css.cell.height + "px", i.style.top = (e.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height + "px", i.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
          const l = (s = e.options.x) !== null && s !== void 0 ? s : 0;
          return l && l > this._bufferService.cols && (i.style.display = "none"), this._refreshXPosition(e, i), i;
        }
        _refreshStyle(e) {
          const r = e.marker.line - this._bufferService.buffers.active.ydisp;
          if (r < 0 || r >= this._bufferService.rows)
            e.element && (e.element.style.display = "none", e.onRenderEmitter.fire(e.element));
          else {
            let s = this._decorationElements.get(e);
            s || (s = this._createElement(e), e.element = s, this._decorationElements.set(e, s), this._container.appendChild(s), e.onDispose(() => {
              this._decorationElements.delete(e), s.remove();
            })), s.style.top = r * this._renderService.dimensions.css.cell.height + "px", s.style.display = this._altBufferIsActive ? "none" : "block", e.onRenderEmitter.fire(s);
          }
        }
        _refreshXPosition(e, r = e.element) {
          var s;
          if (!r)
            return;
          const i = (s = e.options.x) !== null && s !== void 0 ? s : 0;
          (e.options.anchor || "left") === "right" ? r.style.right = i ? i * this._renderService.dimensions.css.cell.width + "px" : "" : r.style.left = i ? i * this._renderService.dimensions.css.cell.width + "px" : "";
        }
        _removeDecoration(e) {
          var r;
          (r = this._decorationElements.get(e)) === null || r === void 0 || r.remove(), this._decorationElements.delete(e), e.dispose();
        }
      };
      t.BufferDecorationRenderer = u = o([_(1, g.IBufferService), _(2, g.IDecorationService), _(3, d.IRenderService)], u);
    }, 5871: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ColorZoneStore = void 0, t.ColorZoneStore = class {
        constructor() {
          this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
        }
        get zones() {
          return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
        }
        clear() {
          this._zones.length = 0, this._zonePoolIndex = 0;
        }
        addDecoration(n) {
          if (n.options.overviewRulerOptions) {
            for (const o of this._zones)
              if (o.color === n.options.overviewRulerOptions.color && o.position === n.options.overviewRulerOptions.position) {
                if (this._lineIntersectsZone(o, n.marker.line))
                  return;
                if (this._lineAdjacentToZone(o, n.marker.line, n.options.overviewRulerOptions.position))
                  return void this._addLineToZone(o, n.marker.line);
              }
            if (this._zonePoolIndex < this._zonePool.length)
              return this._zonePool[this._zonePoolIndex].color = n.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = n.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = n.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = n.marker.line, void this._zones.push(this._zonePool[this._zonePoolIndex++]);
            this._zones.push({ color: n.options.overviewRulerOptions.color, position: n.options.overviewRulerOptions.position, startBufferLine: n.marker.line, endBufferLine: n.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
          }
        }
        setPadding(n) {
          this._linePadding = n;
        }
        _lineIntersectsZone(n, o) {
          return o >= n.startBufferLine && o <= n.endBufferLine;
        }
        _lineAdjacentToZone(n, o, _) {
          return o >= n.startBufferLine - this._linePadding[_ || "full"] && o <= n.endBufferLine + this._linePadding[_ || "full"];
        }
        _addLineToZone(n, o) {
          n.startBufferLine = Math.min(n.startBufferLine, o), n.endBufferLine = Math.max(n.endBufferLine, o);
        }
      };
    }, 5744: function(k, t, n) {
      var o = this && this.__decorate || function(l, h, f, b) {
        var c, p = arguments.length, L = p < 3 ? h : b === null ? b = Object.getOwnPropertyDescriptor(h, f) : b;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          L = Reflect.decorate(l, h, f, b);
        else
          for (var M = l.length - 1; M >= 0; M--)
            (c = l[M]) && (L = (p < 3 ? c(L) : p > 3 ? c(h, f, L) : c(h, f)) || L);
        return p > 3 && L && Object.defineProperty(h, f, L), L;
      }, _ = this && this.__param || function(l, h) {
        return function(f, b) {
          h(f, b, l);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.OverviewRulerRenderer = void 0;
      const a = n(5871), d = n(3656), v = n(4725), g = n(844), u = n(2585), e = { full: 0, left: 0, center: 0, right: 0 }, r = { full: 0, left: 0, center: 0, right: 0 }, s = { full: 0, left: 0, center: 0, right: 0 };
      let i = t.OverviewRulerRenderer = class extends g.Disposable {
        get _width() {
          return this._optionsService.options.overviewRulerWidth || 0;
        }
        constructor(l, h, f, b, c, p, L) {
          var M;
          super(), this._viewportElement = l, this._screenElement = h, this._bufferService = f, this._decorationService = b, this._renderService = c, this._optionsService = p, this._coreBrowseService = L, this._colorZoneStore = new a.ColorZoneStore(), this._shouldUpdateDimensions = !0, this._shouldUpdateAnchor = !0, this._lastKnownBufferLength = 0, this._canvas = document.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), (M = this._viewportElement.parentElement) === null || M === void 0 || M.insertBefore(this._canvas, this._viewportElement);
          const D = this._canvas.getContext("2d");
          if (!D)
            throw new Error("Ctx cannot be null");
          this._ctx = D, this._registerDecorationListeners(), this._registerBufferChangeListeners(), this._registerDimensionChangeListeners(), this.register((0, g.toDisposable)(() => {
            var T;
            (T = this._canvas) === null || T === void 0 || T.remove();
          }));
        }
        _registerDecorationListeners() {
          this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, !0))), this.register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, !0)));
        }
        _registerBufferChangeListeners() {
          this.register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
            this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
          })), this.register(this._bufferService.onScroll(() => {
            this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
          }));
        }
        _registerDimensionChangeListeners() {
          this.register(this._renderService.onRender(() => {
            this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(!0), this._containerHeight = this._screenElement.clientHeight);
          })), this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth", () => this._queueRefresh(!0))), this.register((0, d.addDisposableDomListener)(this._coreBrowseService.window, "resize", () => this._queueRefresh(!0))), this._queueRefresh(!0);
        }
        _refreshDrawConstants() {
          const l = Math.floor(this._canvas.width / 3), h = Math.ceil(this._canvas.width / 3);
          r.full = this._canvas.width, r.left = l, r.center = h, r.right = l, this._refreshDrawHeightConstants(), s.full = 0, s.left = 0, s.center = r.left, s.right = r.left + r.center;
        }
        _refreshDrawHeightConstants() {
          e.full = Math.round(2 * this._coreBrowseService.dpr);
          const l = this._canvas.height / this._bufferService.buffer.lines.length, h = Math.round(Math.max(Math.min(l, 12), 6) * this._coreBrowseService.dpr);
          e.left = h, e.center = h, e.right = h;
        }
        _refreshColorZonePadding() {
          this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * e.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * e.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * e.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * e.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
        }
        _refreshCanvasDimensions() {
          this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowseService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowseService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
        }
        _refreshDecorations() {
          this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
          for (const h of this._decorationService.decorations)
            this._colorZoneStore.addDecoration(h);
          this._ctx.lineWidth = 1;
          const l = this._colorZoneStore.zones;
          for (const h of l)
            h.position !== "full" && this._renderColorZone(h);
          for (const h of l)
            h.position === "full" && this._renderColorZone(h);
          this._shouldUpdateDimensions = !1, this._shouldUpdateAnchor = !1;
        }
        _renderColorZone(l) {
          this._ctx.fillStyle = l.color, this._ctx.fillRect(s[l.position || "full"], Math.round((this._canvas.height - 1) * (l.startBufferLine / this._bufferService.buffers.active.lines.length) - e[l.position || "full"] / 2), r[l.position || "full"], Math.round((this._canvas.height - 1) * ((l.endBufferLine - l.startBufferLine) / this._bufferService.buffers.active.lines.length) + e[l.position || "full"]));
        }
        _queueRefresh(l, h) {
          this._shouldUpdateDimensions = l || this._shouldUpdateDimensions, this._shouldUpdateAnchor = h || this._shouldUpdateAnchor, this._animationFrame === void 0 && (this._animationFrame = this._coreBrowseService.window.requestAnimationFrame(() => {
            this._refreshDecorations(), this._animationFrame = void 0;
          }));
        }
      };
      t.OverviewRulerRenderer = i = o([_(2, u.IBufferService), _(3, u.IDecorationService), _(4, v.IRenderService), _(5, u.IOptionsService), _(6, v.ICoreBrowserService)], i);
    }, 2950: function(k, t, n) {
      var o = this && this.__decorate || function(u, e, r, s) {
        var i, l = arguments.length, h = l < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, r) : s;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          h = Reflect.decorate(u, e, r, s);
        else
          for (var f = u.length - 1; f >= 0; f--)
            (i = u[f]) && (h = (l < 3 ? i(h) : l > 3 ? i(e, r, h) : i(e, r)) || h);
        return l > 3 && h && Object.defineProperty(e, r, h), h;
      }, _ = this && this.__param || function(u, e) {
        return function(r, s) {
          e(r, s, u);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CompositionHelper = void 0;
      const a = n(4725), d = n(2585), v = n(2584);
      let g = t.CompositionHelper = class {
        get isComposing() {
          return this._isComposing;
        }
        constructor(u, e, r, s, i, l) {
          this._textarea = u, this._compositionView = e, this._bufferService = r, this._optionsService = s, this._coreService = i, this._renderService = l, this._isComposing = !1, this._isSendingComposition = !1, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
        }
        compositionstart() {
          this._isComposing = !0, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
        }
        compositionupdate(u) {
          this._compositionView.textContent = u.data, this.updateCompositionElements(), setTimeout(() => {
            this._compositionPosition.end = this._textarea.value.length;
          }, 0);
        }
        compositionend() {
          this._finalizeComposition(!0);
        }
        keydown(u) {
          if (this._isComposing || this._isSendingComposition) {
            if (u.keyCode === 229 || u.keyCode === 16 || u.keyCode === 17 || u.keyCode === 18)
              return !1;
            this._finalizeComposition(!1);
          }
          return u.keyCode !== 229 || (this._handleAnyTextareaChanges(), !1);
        }
        _finalizeComposition(u) {
          if (this._compositionView.classList.remove("active"), this._isComposing = !1, u) {
            const e = { start: this._compositionPosition.start, end: this._compositionPosition.end };
            this._isSendingComposition = !0, setTimeout(() => {
              if (this._isSendingComposition) {
                let r;
                this._isSendingComposition = !1, e.start += this._dataAlreadySent.length, r = this._isComposing ? this._textarea.value.substring(e.start, e.end) : this._textarea.value.substring(e.start), r.length > 0 && this._coreService.triggerDataEvent(r, !0);
              }
            }, 0);
          } else {
            this._isSendingComposition = !1;
            const e = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
            this._coreService.triggerDataEvent(e, !0);
          }
        }
        _handleAnyTextareaChanges() {
          const u = this._textarea.value;
          setTimeout(() => {
            if (!this._isComposing) {
              const e = this._textarea.value, r = e.replace(u, "");
              this._dataAlreadySent = r, e.length > u.length ? this._coreService.triggerDataEvent(r, !0) : e.length < u.length ? this._coreService.triggerDataEvent(`${v.C0.DEL}`, !0) : e.length === u.length && e !== u && this._coreService.triggerDataEvent(e, !0);
            }
          }, 0);
        }
        updateCompositionElements(u) {
          if (this._isComposing) {
            if (this._bufferService.buffer.isCursorInViewport) {
              const e = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), r = this._renderService.dimensions.css.cell.height, s = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, i = e * this._renderService.dimensions.css.cell.width;
              this._compositionView.style.left = i + "px", this._compositionView.style.top = s + "px", this._compositionView.style.height = r + "px", this._compositionView.style.lineHeight = r + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
              const l = this._compositionView.getBoundingClientRect();
              this._textarea.style.left = i + "px", this._textarea.style.top = s + "px", this._textarea.style.width = Math.max(l.width, 1) + "px", this._textarea.style.height = Math.max(l.height, 1) + "px", this._textarea.style.lineHeight = l.height + "px";
            }
            u || setTimeout(() => this.updateCompositionElements(!0), 0);
          }
        }
      };
      t.CompositionHelper = g = o([_(2, d.IBufferService), _(3, d.IOptionsService), _(4, d.ICoreService), _(5, a.IRenderService)], g);
    }, 9806: (k, t) => {
      function n(o, _, a) {
        const d = a.getBoundingClientRect(), v = o.getComputedStyle(a), g = parseInt(v.getPropertyValue("padding-left")), u = parseInt(v.getPropertyValue("padding-top"));
        return [_.clientX - d.left - g, _.clientY - d.top - u];
      }
      Object.defineProperty(t, "__esModule", { value: !0 }), t.getCoords = t.getCoordsRelativeToElement = void 0, t.getCoordsRelativeToElement = n, t.getCoords = function(o, _, a, d, v, g, u, e, r) {
        if (!g)
          return;
        const s = n(o, _, a);
        return s ? (s[0] = Math.ceil((s[0] + (r ? u / 2 : 0)) / u), s[1] = Math.ceil(s[1] / e), s[0] = Math.min(Math.max(s[0], 1), d + (r ? 1 : 0)), s[1] = Math.min(Math.max(s[1], 1), v), s) : void 0;
      };
    }, 9504: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.moveToCellSequence = void 0;
      const o = n(2584);
      function _(e, r, s, i) {
        const l = e - a(e, s), h = r - a(r, s), f = Math.abs(l - h) - function(b, c, p) {
          let L = 0;
          const M = b - a(b, p), D = c - a(c, p);
          for (let T = 0; T < Math.abs(M - D); T++) {
            const I = d(b, c) === "A" ? -1 : 1, F = p.buffer.lines.get(M + I * T);
            F != null && F.isWrapped && L++;
          }
          return L;
        }(e, r, s);
        return u(f, g(d(e, r), i));
      }
      function a(e, r) {
        let s = 0, i = r.buffer.lines.get(e), l = i == null ? void 0 : i.isWrapped;
        for (; l && e >= 0 && e < r.rows; )
          s++, i = r.buffer.lines.get(--e), l = i == null ? void 0 : i.isWrapped;
        return s;
      }
      function d(e, r) {
        return e > r ? "A" : "B";
      }
      function v(e, r, s, i, l, h) {
        let f = e, b = r, c = "";
        for (; f !== s || b !== i; )
          f += l ? 1 : -1, l && f > h.cols - 1 ? (c += h.buffer.translateBufferLineToString(b, !1, e, f), f = 0, e = 0, b++) : !l && f < 0 && (c += h.buffer.translateBufferLineToString(b, !1, 0, e + 1), f = h.cols - 1, e = f, b--);
        return c + h.buffer.translateBufferLineToString(b, !1, e, f);
      }
      function g(e, r) {
        const s = r ? "O" : "[";
        return o.C0.ESC + s + e;
      }
      function u(e, r) {
        e = Math.floor(e);
        let s = "";
        for (let i = 0; i < e; i++)
          s += r;
        return s;
      }
      t.moveToCellSequence = function(e, r, s, i) {
        const l = s.buffer.x, h = s.buffer.y;
        if (!s.buffer.hasScrollback)
          return function(c, p, L, M, D, T) {
            return _(p, M, D, T).length === 0 ? "" : u(v(c, p, c, p - a(p, D), !1, D).length, g("D", T));
          }(l, h, 0, r, s, i) + _(h, r, s, i) + function(c, p, L, M, D, T) {
            let I;
            I = _(p, M, D, T).length > 0 ? M - a(M, D) : p;
            const F = M, j = function(N, C, R, A, O, z) {
              let H;
              return H = _(R, A, O, z).length > 0 ? A - a(A, O) : C, N < R && H <= A || N >= R && H < A ? "C" : "D";
            }(c, p, L, M, D, T);
            return u(v(c, I, L, F, j === "C", D).length, g(j, T));
          }(l, h, e, r, s, i);
        let f;
        if (h === r)
          return f = l > e ? "D" : "C", u(Math.abs(l - e), g(f, i));
        f = h > r ? "D" : "C";
        const b = Math.abs(h - r);
        return u(function(c, p) {
          return p.cols - c;
        }(h > r ? e : l, s) + (b - 1) * s.cols + 1 + ((h > r ? l : e) - 1), g(f, i));
      };
    }, 1296: function(k, t, n) {
      var o = this && this.__decorate || function(D, T, I, F) {
        var j, N = arguments.length, C = N < 3 ? T : F === null ? F = Object.getOwnPropertyDescriptor(T, I) : F;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          C = Reflect.decorate(D, T, I, F);
        else
          for (var R = D.length - 1; R >= 0; R--)
            (j = D[R]) && (C = (N < 3 ? j(C) : N > 3 ? j(T, I, C) : j(T, I)) || C);
        return N > 3 && C && Object.defineProperty(T, I, C), C;
      }, _ = this && this.__param || function(D, T) {
        return function(I, F) {
          T(I, F, D);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DomRenderer = void 0;
      const a = n(3787), d = n(2550), v = n(2223), g = n(6171), u = n(4725), e = n(8055), r = n(8460), s = n(844), i = n(2585), l = "xterm-dom-renderer-owner-", h = "xterm-rows", f = "xterm-fg-", b = "xterm-bg-", c = "xterm-focus", p = "xterm-selection";
      let L = 1, M = t.DomRenderer = class extends s.Disposable {
        constructor(D, T, I, F, j, N, C, R, A, O) {
          super(), this._element = D, this._screenElement = T, this._viewportElement = I, this._linkifier2 = F, this._charSizeService = N, this._optionsService = C, this._bufferService = R, this._coreBrowserService = A, this._themeService = O, this._terminalClass = L++, this._rowElements = [], this.onRequestRedraw = this.register(new r.EventEmitter()).event, this._rowContainer = document.createElement("div"), this._rowContainer.classList.add(h), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = document.createElement("div"), this._selectionContainer.classList.add(p), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = (0, g.createRenderDimensions)(), this._updateDimensions(), this.register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this.register(this._themeService.onChangeColors((z) => this._injectCss(z))), this._injectCss(this._themeService.colors), this._rowFactory = j.createInstance(a.DomRendererRowFactory, document), this._element.classList.add(l + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this.register(this._linkifier2.onShowLinkUnderline((z) => this._handleLinkHover(z))), this.register(this._linkifier2.onHideLinkUnderline((z) => this._handleLinkLeave(z))), this.register((0, s.toDisposable)(() => {
            this._element.classList.remove(l + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
          })), this._widthCache = new d.WidthCache(document), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
        }
        _updateDimensions() {
          const D = this._coreBrowserService.dpr;
          this.dimensions.device.char.width = this._charSizeService.width * D, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * D), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / D), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / D), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
          for (const I of this._rowElements)
            I.style.width = `${this.dimensions.css.canvas.width}px`, I.style.height = `${this.dimensions.css.cell.height}px`, I.style.lineHeight = `${this.dimensions.css.cell.height}px`, I.style.overflow = "hidden";
          this._dimensionsStyleElement || (this._dimensionsStyleElement = document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
          const T = `${this._terminalSelector} .${h} span { display: inline-block; height: 100%; vertical-align: top;}`;
          this._dimensionsStyleElement.textContent = T, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
        }
        _injectCss(D) {
          this._themeStyleElement || (this._themeStyleElement = document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
          let T = `${this._terminalSelector} .${h} { color: ${D.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
          T += `${this._terminalSelector} .${h} .xterm-dim { color: ${e.color.multiplyOpacity(D.foreground, 0.5).css};}`, T += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`, T += "@keyframes blink_box_shadow_" + this._terminalClass + " { 50% {  border-bottom-style: hidden; }}", T += "@keyframes blink_block_" + this._terminalClass + ` { 0% {  background-color: ${D.cursor.css};  color: ${D.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${D.cursor.css}; }}`, T += `${this._terminalSelector} .${h}.${c} .xterm-cursor.xterm-cursor-blink:not(.xterm-cursor-block) { animation: blink_box_shadow_` + this._terminalClass + ` 1s step-end infinite;}${this._terminalSelector} .${h}.${c} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: blink_block_` + this._terminalClass + ` 1s step-end infinite;}${this._terminalSelector} .${h} .xterm-cursor.xterm-cursor-block { background-color: ${D.cursor.css}; color: ${D.cursorAccent.css};}${this._terminalSelector} .${h} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${D.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${h} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${D.cursor.css} inset;}${this._terminalSelector} .${h} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${D.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, T += `${this._terminalSelector} .${p} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${p} div { position: absolute; background-color: ${D.selectionBackgroundOpaque.css};}${this._terminalSelector} .${p} div { position: absolute; background-color: ${D.selectionInactiveBackgroundOpaque.css};}`;
          for (const [I, F] of D.ansi.entries())
            T += `${this._terminalSelector} .${f}${I} { color: ${F.css}; }${this._terminalSelector} .${f}${I}.xterm-dim { color: ${e.color.multiplyOpacity(F, 0.5).css}; }${this._terminalSelector} .${b}${I} { background-color: ${F.css}; }`;
          T += `${this._terminalSelector} .${f}${v.INVERTED_DEFAULT_COLOR} { color: ${e.color.opaque(D.background).css}; }${this._terminalSelector} .${f}${v.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${e.color.multiplyOpacity(e.color.opaque(D.background), 0.5).css}; }${this._terminalSelector} .${b}${v.INVERTED_DEFAULT_COLOR} { background-color: ${D.foreground.css}; }`, this._themeStyleElement.textContent = T;
        }
        _setDefaultSpacing() {
          const D = this.dimensions.css.cell.width - this._widthCache.get("W", !1, !1);
          this._rowContainer.style.letterSpacing = `${D}px`, this._rowFactory.defaultSpacing = D;
        }
        handleDevicePixelRatioChange() {
          this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
        }
        _refreshRowElements(D, T) {
          for (let I = this._rowElements.length; I <= T; I++) {
            const F = document.createElement("div");
            this._rowContainer.appendChild(F), this._rowElements.push(F);
          }
          for (; this._rowElements.length > T; )
            this._rowContainer.removeChild(this._rowElements.pop());
        }
        handleResize(D, T) {
          this._refreshRowElements(D, T), this._updateDimensions();
        }
        handleCharSizeChanged() {
          this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
        }
        handleBlur() {
          this._rowContainer.classList.remove(c);
        }
        handleFocus() {
          this._rowContainer.classList.add(c), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
        }
        handleSelectionChanged(D, T, I) {
          if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(D, T, I), this.renderRows(0, this._bufferService.rows - 1), !D || !T)
            return;
          const F = D[1] - this._bufferService.buffer.ydisp, j = T[1] - this._bufferService.buffer.ydisp, N = Math.max(F, 0), C = Math.min(j, this._bufferService.rows - 1);
          if (N >= this._bufferService.rows || C < 0)
            return;
          const R = document.createDocumentFragment();
          if (I) {
            const A = D[0] > T[0];
            R.appendChild(this._createSelectionElement(N, A ? T[0] : D[0], A ? D[0] : T[0], C - N + 1));
          } else {
            const A = F === N ? D[0] : 0, O = N === j ? T[0] : this._bufferService.cols;
            R.appendChild(this._createSelectionElement(N, A, O));
            const z = C - N - 1;
            if (R.appendChild(this._createSelectionElement(N + 1, 0, this._bufferService.cols, z)), N !== C) {
              const H = j === C ? T[0] : this._bufferService.cols;
              R.appendChild(this._createSelectionElement(C, 0, H));
            }
          }
          this._selectionContainer.appendChild(R);
        }
        _createSelectionElement(D, T, I, F = 1) {
          const j = document.createElement("div");
          return j.style.height = F * this.dimensions.css.cell.height + "px", j.style.top = D * this.dimensions.css.cell.height + "px", j.style.left = T * this.dimensions.css.cell.width + "px", j.style.width = this.dimensions.css.cell.width * (I - T) + "px", j;
        }
        handleCursorMove() {
        }
        _handleOptionsChanged() {
          this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
        }
        clear() {
          for (const D of this._rowElements)
            D.replaceChildren();
        }
        renderRows(D, T) {
          const I = this._bufferService.buffer, F = I.ybase + I.y, j = Math.min(I.x, this._bufferService.cols - 1), N = this._optionsService.rawOptions.cursorBlink, C = this._optionsService.rawOptions.cursorStyle, R = this._optionsService.rawOptions.cursorInactiveStyle;
          for (let A = D; A <= T; A++) {
            const O = A + I.ydisp, z = this._rowElements[A], H = I.lines.get(O);
            if (!z || !H)
              break;
            z.replaceChildren(...this._rowFactory.createRow(H, O, O === F, C, R, j, N, this.dimensions.css.cell.width, this._widthCache, -1, -1));
          }
        }
        get _terminalSelector() {
          return `.${l}${this._terminalClass}`;
        }
        _handleLinkHover(D) {
          this._setCellUnderline(D.x1, D.x2, D.y1, D.y2, D.cols, !0);
        }
        _handleLinkLeave(D) {
          this._setCellUnderline(D.x1, D.x2, D.y1, D.y2, D.cols, !1);
        }
        _setCellUnderline(D, T, I, F, j, N) {
          I < 0 && (D = 0), F < 0 && (T = 0);
          const C = this._bufferService.rows - 1;
          I = Math.max(Math.min(I, C), 0), F = Math.max(Math.min(F, C), 0), j = Math.min(j, this._bufferService.cols);
          const R = this._bufferService.buffer, A = R.ybase + R.y, O = Math.min(R.x, j - 1), z = this._optionsService.rawOptions.cursorBlink, H = this._optionsService.rawOptions.cursorStyle, V = this._optionsService.rawOptions.cursorInactiveStyle;
          for (let K = I; K <= F; ++K) {
            const Q = K + R.ydisp, w = this._rowElements[K], P = R.lines.get(Q);
            if (!w || !P)
              break;
            w.replaceChildren(...this._rowFactory.createRow(P, Q, Q === A, H, V, O, z, this.dimensions.css.cell.width, this._widthCache, N ? K === I ? D : 0 : -1, N ? (K === F ? T : j) - 1 : -1));
          }
        }
      };
      t.DomRenderer = M = o([_(4, i.IInstantiationService), _(5, u.ICharSizeService), _(6, i.IOptionsService), _(7, i.IBufferService), _(8, u.ICoreBrowserService), _(9, u.IThemeService)], M);
    }, 3787: function(k, t, n) {
      var o = this && this.__decorate || function(f, b, c, p) {
        var L, M = arguments.length, D = M < 3 ? b : p === null ? p = Object.getOwnPropertyDescriptor(b, c) : p;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          D = Reflect.decorate(f, b, c, p);
        else
          for (var T = f.length - 1; T >= 0; T--)
            (L = f[T]) && (D = (M < 3 ? L(D) : M > 3 ? L(b, c, D) : L(b, c)) || D);
        return M > 3 && D && Object.defineProperty(b, c, D), D;
      }, _ = this && this.__param || function(f, b) {
        return function(c, p) {
          b(c, p, f);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DomRendererRowFactory = void 0;
      const a = n(2223), d = n(643), v = n(511), g = n(2585), u = n(8055), e = n(4725), r = n(4269), s = n(6171), i = n(3734);
      let l = t.DomRendererRowFactory = class {
        constructor(f, b, c, p, L, M, D) {
          this._document = f, this._characterJoinerService = b, this._optionsService = c, this._coreBrowserService = p, this._coreService = L, this._decorationService = M, this._themeService = D, this._workCell = new v.CellData(), this._columnSelectMode = !1, this.defaultSpacing = 0;
        }
        handleSelectionChanged(f, b, c) {
          this._selectionStart = f, this._selectionEnd = b, this._columnSelectMode = c;
        }
        createRow(f, b, c, p, L, M, D, T, I, F, j) {
          const N = [], C = this._characterJoinerService.getJoinedCharacters(b), R = this._themeService.colors;
          let A, O = f.getNoBgTrimmedLength();
          c && O < M + 1 && (O = M + 1);
          let z = 0, H = "", V = 0, K = 0, Q = 0, w = !1, P = 0, U = !1, W = 0;
          const G = [], q = F !== -1 && j !== -1;
          for (let $ = 0; $ < O; $++) {
            f.loadCell($, this._workCell);
            let ie = this._workCell.getWidth();
            if (ie === 0)
              continue;
            let se = !1, be = $, J = this._workCell;
            if (C.length > 0 && $ === C[0][0]) {
              se = !0;
              const ee = C.shift();
              J = new r.JoinedCellData(this._workCell, f.translateToString(!0, ee[0], ee[1]), ee[1] - ee[0]), be = ee[1] - 1, ie = J.getWidth();
            }
            const Ae = this._isCellInSelection($, b), ze = c && $ === M, qe = q && $ >= F && $ <= j;
            let Ke = !1;
            this._decorationService.forEachDecorationAtCell($, b, void 0, (ee) => {
              Ke = !0;
            });
            let Pe = J.getChars() || d.WHITESPACE_CELL_CHAR;
            if (Pe === " " && (J.isUnderline() || J.isOverline()) && (Pe = " "), W = ie * T - I.get(Pe, J.isBold(), J.isItalic()), A) {
              if (z && (Ae && U || !Ae && !U && J.bg === V) && (Ae && U && R.selectionForeground || J.fg === K) && J.extended.ext === Q && qe === w && W === P && !ze && !se && !Ke) {
                H += Pe, z++;
                continue;
              }
              z && (A.textContent = H), A = this._document.createElement("span"), z = 0, H = "";
            } else
              A = this._document.createElement("span");
            if (V = J.bg, K = J.fg, Q = J.extended.ext, w = qe, P = W, U = Ae, se && M >= $ && M <= be && (M = $), !this._coreService.isCursorHidden && ze) {
              if (G.push("xterm-cursor"), this._coreBrowserService.isFocused)
                D && G.push("xterm-cursor-blink"), G.push(p === "bar" ? "xterm-cursor-bar" : p === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
              else if (L)
                switch (L) {
                  case "outline":
                    G.push("xterm-cursor-outline");
                    break;
                  case "block":
                    G.push("xterm-cursor-block");
                    break;
                  case "bar":
                    G.push("xterm-cursor-bar");
                    break;
                  case "underline":
                    G.push("xterm-cursor-underline");
                }
            }
            if (J.isBold() && G.push("xterm-bold"), J.isItalic() && G.push("xterm-italic"), J.isDim() && G.push("xterm-dim"), H = J.isInvisible() ? d.WHITESPACE_CELL_CHAR : J.getChars() || d.WHITESPACE_CELL_CHAR, J.isUnderline() && (G.push(`xterm-underline-${J.extended.underlineStyle}`), H === " " && (H = " "), !J.isUnderlineColorDefault()))
              if (J.isUnderlineColorRGB())
                A.style.textDecorationColor = `rgb(${i.AttributeData.toColorRGB(J.getUnderlineColor()).join(",")})`;
              else {
                let ee = J.getUnderlineColor();
                this._optionsService.rawOptions.drawBoldTextInBrightColors && J.isBold() && ee < 8 && (ee += 8), A.style.textDecorationColor = R.ansi[ee].css;
              }
            J.isOverline() && (G.push("xterm-overline"), H === " " && (H = " ")), J.isStrikethrough() && G.push("xterm-strikethrough"), qe && (A.style.textDecoration = "underline");
            let oe = J.getFgColor(), Be = J.getFgColorMode(), _e = J.getBgColor(), Te = J.getBgColorMode();
            const Ve = !!J.isInverse();
            if (Ve) {
              const ee = oe;
              oe = _e, _e = ee;
              const qt = Be;
              Be = Te, Te = qt;
            }
            let ve, Ge, ge, Me = !1;
            switch (this._decorationService.forEachDecorationAtCell($, b, void 0, (ee) => {
              ee.options.layer !== "top" && Me || (ee.backgroundColorRGB && (Te = 50331648, _e = ee.backgroundColorRGB.rgba >> 8 & 16777215, ve = ee.backgroundColorRGB), ee.foregroundColorRGB && (Be = 50331648, oe = ee.foregroundColorRGB.rgba >> 8 & 16777215, Ge = ee.foregroundColorRGB), Me = ee.options.layer === "top");
            }), !Me && Ae && (ve = this._coreBrowserService.isFocused ? R.selectionBackgroundOpaque : R.selectionInactiveBackgroundOpaque, _e = ve.rgba >> 8 & 16777215, Te = 50331648, Me = !0, R.selectionForeground && (Be = 50331648, oe = R.selectionForeground.rgba >> 8 & 16777215, Ge = R.selectionForeground)), Me && G.push("xterm-decoration-top"), Te) {
              case 16777216:
              case 33554432:
                ge = R.ansi[_e], G.push(`xterm-bg-${_e}`);
                break;
              case 50331648:
                ge = u.rgba.toColor(_e >> 16, _e >> 8 & 255, 255 & _e), this._addStyle(A, `background-color:#${h((_e >>> 0).toString(16), "0", 6)}`);
                break;
              default:
                Ve ? (ge = R.foreground, G.push(`xterm-bg-${a.INVERTED_DEFAULT_COLOR}`)) : ge = R.background;
            }
            switch (ve || J.isDim() && (ve = u.color.multiplyOpacity(ge, 0.5)), Be) {
              case 16777216:
              case 33554432:
                J.isBold() && oe < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (oe += 8), this._applyMinimumContrast(A, ge, R.ansi[oe], J, ve, void 0) || G.push(`xterm-fg-${oe}`);
                break;
              case 50331648:
                const ee = u.rgba.toColor(oe >> 16 & 255, oe >> 8 & 255, 255 & oe);
                this._applyMinimumContrast(A, ge, ee, J, ve, Ge) || this._addStyle(A, `color:#${h(oe.toString(16), "0", 6)}`);
                break;
              default:
                this._applyMinimumContrast(A, ge, R.foreground, J, ve, void 0) || Ve && G.push(`xterm-fg-${a.INVERTED_DEFAULT_COLOR}`);
            }
            G.length && (A.className = G.join(" "), G.length = 0), ze || se || Ke ? A.textContent = H : z++, W !== this.defaultSpacing && (A.style.letterSpacing = `${W}px`), N.push(A), $ = be;
          }
          return A && z && (A.textContent = H), N;
        }
        _applyMinimumContrast(f, b, c, p, L, M) {
          if (this._optionsService.rawOptions.minimumContrastRatio === 1 || (0, s.excludeFromContrastRatioDemands)(p.getCode()))
            return !1;
          const D = this._getContrastCache(p);
          let T;
          if (L || M || (T = D.getColor(b.rgba, c.rgba)), T === void 0) {
            const I = this._optionsService.rawOptions.minimumContrastRatio / (p.isDim() ? 2 : 1);
            T = u.color.ensureContrastRatio(L || b, M || c, I), D.setColor((L || b).rgba, (M || c).rgba, T ?? null);
          }
          return !!T && (this._addStyle(f, `color:${T.css}`), !0);
        }
        _getContrastCache(f) {
          return f.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
        }
        _addStyle(f, b) {
          f.setAttribute("style", `${f.getAttribute("style") || ""}${b};`);
        }
        _isCellInSelection(f, b) {
          const c = this._selectionStart, p = this._selectionEnd;
          return !(!c || !p) && (this._columnSelectMode ? c[0] <= p[0] ? f >= c[0] && b >= c[1] && f < p[0] && b <= p[1] : f < c[0] && b >= c[1] && f >= p[0] && b <= p[1] : b > c[1] && b < p[1] || c[1] === p[1] && b === c[1] && f >= c[0] && f < p[0] || c[1] < p[1] && b === p[1] && f < p[0] || c[1] < p[1] && b === c[1] && f >= c[0]);
        }
      };
      function h(f, b, c) {
        for (; f.length < c; )
          f = b + f;
        return f;
      }
      t.DomRendererRowFactory = l = o([_(1, e.ICharacterJoinerService), _(2, g.IOptionsService), _(3, e.ICoreBrowserService), _(4, g.ICoreService), _(5, g.IDecorationService), _(6, e.IThemeService)], l);
    }, 2550: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.WidthCache = void 0, t.WidthCache = class {
        constructor(n) {
          this._flat = new Float32Array(256), this._font = "", this._fontSize = 0, this._weight = "normal", this._weightBold = "bold", this._measureElements = [], this._container = n.createElement("div"), this._container.style.position = "absolute", this._container.style.top = "-50000px", this._container.style.width = "50000px", this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
          const o = n.createElement("span"), _ = n.createElement("span");
          _.style.fontWeight = "bold";
          const a = n.createElement("span");
          a.style.fontStyle = "italic";
          const d = n.createElement("span");
          d.style.fontWeight = "bold", d.style.fontStyle = "italic", this._measureElements = [o, _, a, d], this._container.appendChild(o), this._container.appendChild(_), this._container.appendChild(a), this._container.appendChild(d), n.body.appendChild(this._container), this.clear();
        }
        dispose() {
          this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
        }
        clear() {
          this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
        }
        setFont(n, o, _, a) {
          n === this._font && o === this._fontSize && _ === this._weight && a === this._weightBold || (this._font = n, this._fontSize = o, this._weight = _, this._weightBold = a, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${_}`, this._measureElements[1].style.fontWeight = `${a}`, this._measureElements[2].style.fontWeight = `${_}`, this._measureElements[3].style.fontWeight = `${a}`, this.clear());
        }
        get(n, o, _) {
          let a = 0;
          if (!o && !_ && n.length === 1 && (a = n.charCodeAt(0)) < 256)
            return this._flat[a] !== -9999 ? this._flat[a] : this._flat[a] = this._measure(n, 0);
          let d = n;
          o && (d += "B"), _ && (d += "I");
          let v = this._holey.get(d);
          if (v === void 0) {
            let g = 0;
            o && (g |= 1), _ && (g |= 2), v = this._measure(n, g), this._holey.set(d, v);
          }
          return v;
        }
        _measure(n, o) {
          const _ = this._measureElements[o];
          return _.textContent = n.repeat(32), _.offsetWidth / 32;
        }
      };
    }, 2223: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.TEXT_BASELINE = t.DIM_OPACITY = t.INVERTED_DEFAULT_COLOR = void 0;
      const o = n(6114);
      t.INVERTED_DEFAULT_COLOR = 257, t.DIM_OPACITY = 0.5, t.TEXT_BASELINE = o.isFirefox || o.isLegacyEdge ? "bottom" : "ideographic";
    }, 6171: (k, t) => {
      function n(o) {
        return 57508 <= o && o <= 57558;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }), t.createRenderDimensions = t.excludeFromContrastRatioDemands = t.isRestrictedPowerlineGlyph = t.isPowerlineGlyph = t.throwIfFalsy = void 0, t.throwIfFalsy = function(o) {
        if (!o)
          throw new Error("value must not be falsy");
        return o;
      }, t.isPowerlineGlyph = n, t.isRestrictedPowerlineGlyph = function(o) {
        return 57520 <= o && o <= 57527;
      }, t.excludeFromContrastRatioDemands = function(o) {
        return n(o) || function(_) {
          return 9472 <= _ && _ <= 9631;
        }(o);
      }, t.createRenderDimensions = function() {
        return { css: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 } }, device: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 }, char: { width: 0, height: 0, left: 0, top: 0 } } };
      };
    }, 456: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.SelectionModel = void 0, t.SelectionModel = class {
        constructor(n) {
          this._bufferService = n, this.isSelectAllActive = !1, this.selectionStartLength = 0;
        }
        clearSelection() {
          this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = !1, this.selectionStartLength = 0;
        }
        get finalSelectionStart() {
          return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
        }
        get finalSelectionEnd() {
          if (this.isSelectAllActive)
            return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
          if (this.selectionStart) {
            if (!this.selectionEnd || this.areSelectionValuesReversed()) {
              const n = this.selectionStart[0] + this.selectionStartLength;
              return n > this._bufferService.cols ? n % this._bufferService.cols == 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(n / this._bufferService.cols) - 1] : [n % this._bufferService.cols, this.selectionStart[1] + Math.floor(n / this._bufferService.cols)] : [n, this.selectionStart[1]];
            }
            if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
              const n = this.selectionStart[0] + this.selectionStartLength;
              return n > this._bufferService.cols ? [n % this._bufferService.cols, this.selectionStart[1] + Math.floor(n / this._bufferService.cols)] : [Math.max(n, this.selectionEnd[0]), this.selectionEnd[1]];
            }
            return this.selectionEnd;
          }
        }
        areSelectionValuesReversed() {
          const n = this.selectionStart, o = this.selectionEnd;
          return !(!n || !o) && (n[1] > o[1] || n[1] === o[1] && n[0] > o[0]);
        }
        handleTrim(n) {
          return this.selectionStart && (this.selectionStart[1] -= n), this.selectionEnd && (this.selectionEnd[1] -= n), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), !0) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), !1);
        }
      };
    }, 428: function(k, t, n) {
      var o = this && this.__decorate || function(e, r, s, i) {
        var l, h = arguments.length, f = h < 3 ? r : i === null ? i = Object.getOwnPropertyDescriptor(r, s) : i;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          f = Reflect.decorate(e, r, s, i);
        else
          for (var b = e.length - 1; b >= 0; b--)
            (l = e[b]) && (f = (h < 3 ? l(f) : h > 3 ? l(r, s, f) : l(r, s)) || f);
        return h > 3 && f && Object.defineProperty(r, s, f), f;
      }, _ = this && this.__param || function(e, r) {
        return function(s, i) {
          r(s, i, e);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CharSizeService = void 0;
      const a = n(2585), d = n(8460), v = n(844);
      let g = t.CharSizeService = class extends v.Disposable {
        get hasValidSize() {
          return this.width > 0 && this.height > 0;
        }
        constructor(e, r, s) {
          super(), this._optionsService = s, this.width = 0, this.height = 0, this._onCharSizeChange = this.register(new d.EventEmitter()), this.onCharSizeChange = this._onCharSizeChange.event, this._measureStrategy = new u(e, r, this._optionsService), this.register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
        }
        measure() {
          const e = this._measureStrategy.measure();
          e.width === this.width && e.height === this.height || (this.width = e.width, this.height = e.height, this._onCharSizeChange.fire());
        }
      };
      t.CharSizeService = g = o([_(2, a.IOptionsService)], g);
      class u {
        constructor(r, s, i) {
          this._document = r, this._parentElement = s, this._optionsService = i, this._result = { width: 0, height: 0 }, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
        }
        measure() {
          this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`;
          const r = { height: Number(this._measureElement.offsetHeight), width: Number(this._measureElement.offsetWidth) };
          return r.width !== 0 && r.height !== 0 && (this._result.width = r.width / 32, this._result.height = Math.ceil(r.height)), this._result;
        }
      }
    }, 4269: function(k, t, n) {
      var o = this && this.__decorate || function(r, s, i, l) {
        var h, f = arguments.length, b = f < 3 ? s : l === null ? l = Object.getOwnPropertyDescriptor(s, i) : l;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          b = Reflect.decorate(r, s, i, l);
        else
          for (var c = r.length - 1; c >= 0; c--)
            (h = r[c]) && (b = (f < 3 ? h(b) : f > 3 ? h(s, i, b) : h(s, i)) || b);
        return f > 3 && b && Object.defineProperty(s, i, b), b;
      }, _ = this && this.__param || function(r, s) {
        return function(i, l) {
          s(i, l, r);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CharacterJoinerService = t.JoinedCellData = void 0;
      const a = n(3734), d = n(643), v = n(511), g = n(2585);
      class u extends a.AttributeData {
        constructor(s, i, l) {
          super(), this.content = 0, this.combinedData = "", this.fg = s.fg, this.bg = s.bg, this.combinedData = i, this._width = l;
        }
        isCombined() {
          return 2097152;
        }
        getWidth() {
          return this._width;
        }
        getChars() {
          return this.combinedData;
        }
        getCode() {
          return 2097151;
        }
        setFromCharData(s) {
          throw new Error("not implemented");
        }
        getAsCharData() {
          return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
        }
      }
      t.JoinedCellData = u;
      let e = t.CharacterJoinerService = class xt {
        constructor(s) {
          this._bufferService = s, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new v.CellData();
        }
        register(s) {
          const i = { id: this._nextCharacterJoinerId++, handler: s };
          return this._characterJoiners.push(i), i.id;
        }
        deregister(s) {
          for (let i = 0; i < this._characterJoiners.length; i++)
            if (this._characterJoiners[i].id === s)
              return this._characterJoiners.splice(i, 1), !0;
          return !1;
        }
        getJoinedCharacters(s) {
          if (this._characterJoiners.length === 0)
            return [];
          const i = this._bufferService.buffer.lines.get(s);
          if (!i || i.length === 0)
            return [];
          const l = [], h = i.translateToString(!0);
          let f = 0, b = 0, c = 0, p = i.getFg(0), L = i.getBg(0);
          for (let M = 0; M < i.getTrimmedLength(); M++)
            if (i.loadCell(M, this._workCell), this._workCell.getWidth() !== 0) {
              if (this._workCell.fg !== p || this._workCell.bg !== L) {
                if (M - f > 1) {
                  const D = this._getJoinedRanges(h, c, b, i, f);
                  for (let T = 0; T < D.length; T++)
                    l.push(D[T]);
                }
                f = M, c = b, p = this._workCell.fg, L = this._workCell.bg;
              }
              b += this._workCell.getChars().length || d.WHITESPACE_CELL_CHAR.length;
            }
          if (this._bufferService.cols - f > 1) {
            const M = this._getJoinedRanges(h, c, b, i, f);
            for (let D = 0; D < M.length; D++)
              l.push(M[D]);
          }
          return l;
        }
        _getJoinedRanges(s, i, l, h, f) {
          const b = s.substring(i, l);
          let c = [];
          try {
            c = this._characterJoiners[0].handler(b);
          } catch (p) {
            console.error(p);
          }
          for (let p = 1; p < this._characterJoiners.length; p++)
            try {
              const L = this._characterJoiners[p].handler(b);
              for (let M = 0; M < L.length; M++)
                xt._mergeRanges(c, L[M]);
            } catch (L) {
              console.error(L);
            }
          return this._stringRangesToCellRanges(c, h, f), c;
        }
        _stringRangesToCellRanges(s, i, l) {
          let h = 0, f = !1, b = 0, c = s[h];
          if (c) {
            for (let p = l; p < this._bufferService.cols; p++) {
              const L = i.getWidth(p), M = i.getString(p).length || d.WHITESPACE_CELL_CHAR.length;
              if (L !== 0) {
                if (!f && c[0] <= b && (c[0] = p, f = !0), c[1] <= b) {
                  if (c[1] = p, c = s[++h], !c)
                    break;
                  c[0] <= b ? (c[0] = p, f = !0) : f = !1;
                }
                b += M;
              }
            }
            c && (c[1] = this._bufferService.cols);
          }
        }
        static _mergeRanges(s, i) {
          let l = !1;
          for (let h = 0; h < s.length; h++) {
            const f = s[h];
            if (l) {
              if (i[1] <= f[0])
                return s[h - 1][1] = i[1], s;
              if (i[1] <= f[1])
                return s[h - 1][1] = Math.max(i[1], f[1]), s.splice(h, 1), s;
              s.splice(h, 1), h--;
            } else {
              if (i[1] <= f[0])
                return s.splice(h, 0, i), s;
              if (i[1] <= f[1])
                return f[0] = Math.min(i[0], f[0]), s;
              i[0] < f[1] && (f[0] = Math.min(i[0], f[0]), l = !0);
            }
          }
          return l ? s[s.length - 1][1] = i[1] : s.push(i), s;
        }
      };
      t.CharacterJoinerService = e = o([_(0, g.IBufferService)], e);
    }, 5114: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CoreBrowserService = void 0, t.CoreBrowserService = class {
        constructor(n, o) {
          this._textarea = n, this.window = o, this._isFocused = !1, this._cachedIsFocused = void 0, this._textarea.addEventListener("focus", () => this._isFocused = !0), this._textarea.addEventListener("blur", () => this._isFocused = !1);
        }
        get dpr() {
          return this.window.devicePixelRatio;
        }
        get isFocused() {
          return this._cachedIsFocused === void 0 && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = void 0)), this._cachedIsFocused;
        }
      };
    }, 8934: function(k, t, n) {
      var o = this && this.__decorate || function(g, u, e, r) {
        var s, i = arguments.length, l = i < 3 ? u : r === null ? r = Object.getOwnPropertyDescriptor(u, e) : r;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          l = Reflect.decorate(g, u, e, r);
        else
          for (var h = g.length - 1; h >= 0; h--)
            (s = g[h]) && (l = (i < 3 ? s(l) : i > 3 ? s(u, e, l) : s(u, e)) || l);
        return i > 3 && l && Object.defineProperty(u, e, l), l;
      }, _ = this && this.__param || function(g, u) {
        return function(e, r) {
          u(e, r, g);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.MouseService = void 0;
      const a = n(4725), d = n(9806);
      let v = t.MouseService = class {
        constructor(g, u) {
          this._renderService = g, this._charSizeService = u;
        }
        getCoords(g, u, e, r, s) {
          return (0, d.getCoords)(window, g, u, e, r, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, s);
        }
        getMouseReportCoords(g, u) {
          const e = (0, d.getCoordsRelativeToElement)(window, g, u);
          if (this._charSizeService.hasValidSize)
            return e[0] = Math.min(Math.max(e[0], 0), this._renderService.dimensions.css.canvas.width - 1), e[1] = Math.min(Math.max(e[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(e[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(e[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(e[0]), y: Math.floor(e[1]) };
        }
      };
      t.MouseService = v = o([_(0, a.IRenderService), _(1, a.ICharSizeService)], v);
    }, 3230: function(k, t, n) {
      var o = this && this.__decorate || function(l, h, f, b) {
        var c, p = arguments.length, L = p < 3 ? h : b === null ? b = Object.getOwnPropertyDescriptor(h, f) : b;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          L = Reflect.decorate(l, h, f, b);
        else
          for (var M = l.length - 1; M >= 0; M--)
            (c = l[M]) && (L = (p < 3 ? c(L) : p > 3 ? c(h, f, L) : c(h, f)) || L);
        return p > 3 && L && Object.defineProperty(h, f, L), L;
      }, _ = this && this.__param || function(l, h) {
        return function(f, b) {
          h(f, b, l);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.RenderService = void 0;
      const a = n(3656), d = n(6193), v = n(5596), g = n(4725), u = n(8460), e = n(844), r = n(7226), s = n(2585);
      let i = t.RenderService = class extends e.Disposable {
        get dimensions() {
          return this._renderer.value.dimensions;
        }
        constructor(l, h, f, b, c, p, L, M) {
          if (super(), this._rowCount = l, this._charSizeService = b, this._renderer = this.register(new e.MutableDisposable()), this._pausedResizeTask = new r.DebouncedIdleTask(), this._isPaused = !1, this._needsFullRefresh = !1, this._isNextRenderRedrawOnly = !0, this._needsSelectionRefresh = !1, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = { start: void 0, end: void 0, columnSelectMode: !1 }, this._onDimensionsChange = this.register(new u.EventEmitter()), this.onDimensionsChange = this._onDimensionsChange.event, this._onRenderedViewportChange = this.register(new u.EventEmitter()), this.onRenderedViewportChange = this._onRenderedViewportChange.event, this._onRender = this.register(new u.EventEmitter()), this.onRender = this._onRender.event, this._onRefreshRequest = this.register(new u.EventEmitter()), this.onRefreshRequest = this._onRefreshRequest.event, this._renderDebouncer = new d.RenderDebouncer(L.window, (D, T) => this._renderRows(D, T)), this.register(this._renderDebouncer), this._screenDprMonitor = new v.ScreenDprMonitor(L.window), this._screenDprMonitor.setListener(() => this.handleDevicePixelRatioChange()), this.register(this._screenDprMonitor), this.register(p.onResize(() => this._fullRefresh())), this.register(p.buffers.onBufferActivate(() => {
            var D;
            return (D = this._renderer.value) === null || D === void 0 ? void 0 : D.clear();
          })), this.register(f.onOptionChange(() => this._handleOptionsChanged())), this.register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this.register(c.onDecorationRegistered(() => this._fullRefresh())), this.register(c.onDecorationRemoved(() => this._fullRefresh())), this.register(f.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio"], () => {
            this.clear(), this.handleResize(p.cols, p.rows), this._fullRefresh();
          })), this.register(f.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(p.buffer.y, p.buffer.y, !0))), this.register((0, a.addDisposableDomListener)(L.window, "resize", () => this.handleDevicePixelRatioChange())), this.register(M.onChangeColors(() => this._fullRefresh())), "IntersectionObserver" in L.window) {
            const D = new L.window.IntersectionObserver((T) => this._handleIntersectionChange(T[T.length - 1]), { threshold: 0 });
            D.observe(h), this.register({ dispose: () => D.disconnect() });
          }
        }
        _handleIntersectionChange(l) {
          this._isPaused = l.isIntersecting === void 0 ? l.intersectionRatio === 0 : !l.isIntersecting, this._isPaused || this._charSizeService.hasValidSize || this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = !1);
        }
        refreshRows(l, h, f = !1) {
          this._isPaused ? this._needsFullRefresh = !0 : (f || (this._isNextRenderRedrawOnly = !1), this._renderDebouncer.refresh(l, h, this._rowCount));
        }
        _renderRows(l, h) {
          this._renderer.value && (l = Math.min(l, this._rowCount - 1), h = Math.min(h, this._rowCount - 1), this._renderer.value.renderRows(l, h), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = !1), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: l, end: h }), this._onRender.fire({ start: l, end: h }), this._isNextRenderRedrawOnly = !0);
        }
        resize(l, h) {
          this._rowCount = h, this._fireOnCanvasResize();
        }
        _handleOptionsChanged() {
          this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
        }
        _fireOnCanvasResize() {
          this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
        }
        hasRenderer() {
          return !!this._renderer.value;
        }
        setRenderer(l) {
          this._renderer.value = l, this._renderer.value.onRequestRedraw((h) => this.refreshRows(h.start, h.end, !0)), this._needsSelectionRefresh = !0, this._fullRefresh();
        }
        addRefreshCallback(l) {
          return this._renderDebouncer.addRefreshCallback(l);
        }
        _fullRefresh() {
          this._isPaused ? this._needsFullRefresh = !0 : this.refreshRows(0, this._rowCount - 1);
        }
        clearTextureAtlas() {
          var l, h;
          this._renderer.value && ((h = (l = this._renderer.value).clearTextureAtlas) === null || h === void 0 || h.call(l), this._fullRefresh());
        }
        handleDevicePixelRatioChange() {
          this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
        }
        handleResize(l, h) {
          this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => this._renderer.value.handleResize(l, h)) : this._renderer.value.handleResize(l, h), this._fullRefresh());
        }
        handleCharSizeChanged() {
          var l;
          (l = this._renderer.value) === null || l === void 0 || l.handleCharSizeChanged();
        }
        handleBlur() {
          var l;
          (l = this._renderer.value) === null || l === void 0 || l.handleBlur();
        }
        handleFocus() {
          var l;
          (l = this._renderer.value) === null || l === void 0 || l.handleFocus();
        }
        handleSelectionChanged(l, h, f) {
          var b;
          this._selectionState.start = l, this._selectionState.end = h, this._selectionState.columnSelectMode = f, (b = this._renderer.value) === null || b === void 0 || b.handleSelectionChanged(l, h, f);
        }
        handleCursorMove() {
          var l;
          (l = this._renderer.value) === null || l === void 0 || l.handleCursorMove();
        }
        clear() {
          var l;
          (l = this._renderer.value) === null || l === void 0 || l.clear();
        }
      };
      t.RenderService = i = o([_(2, s.IOptionsService), _(3, g.ICharSizeService), _(4, s.IDecorationService), _(5, s.IBufferService), _(6, g.ICoreBrowserService), _(7, g.IThemeService)], i);
    }, 9312: function(k, t, n) {
      var o = this && this.__decorate || function(c, p, L, M) {
        var D, T = arguments.length, I = T < 3 ? p : M === null ? M = Object.getOwnPropertyDescriptor(p, L) : M;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          I = Reflect.decorate(c, p, L, M);
        else
          for (var F = c.length - 1; F >= 0; F--)
            (D = c[F]) && (I = (T < 3 ? D(I) : T > 3 ? D(p, L, I) : D(p, L)) || I);
        return T > 3 && I && Object.defineProperty(p, L, I), I;
      }, _ = this && this.__param || function(c, p) {
        return function(L, M) {
          p(L, M, c);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.SelectionService = void 0;
      const a = n(9806), d = n(9504), v = n(456), g = n(4725), u = n(8460), e = n(844), r = n(6114), s = n(4841), i = n(511), l = n(2585), h = String.fromCharCode(160), f = new RegExp(h, "g");
      let b = t.SelectionService = class extends e.Disposable {
        constructor(c, p, L, M, D, T, I, F, j) {
          super(), this._element = c, this._screenElement = p, this._linkifier = L, this._bufferService = M, this._coreService = D, this._mouseService = T, this._optionsService = I, this._renderService = F, this._coreBrowserService = j, this._dragScrollAmount = 0, this._enabled = !0, this._workCell = new i.CellData(), this._mouseDownTimeStamp = 0, this._oldHasSelection = !1, this._oldSelectionStart = void 0, this._oldSelectionEnd = void 0, this._onLinuxMouseSelection = this.register(new u.EventEmitter()), this.onLinuxMouseSelection = this._onLinuxMouseSelection.event, this._onRedrawRequest = this.register(new u.EventEmitter()), this.onRequestRedraw = this._onRedrawRequest.event, this._onSelectionChange = this.register(new u.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onRequestScrollLines = this.register(new u.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this._mouseMoveListener = (N) => this._handleMouseMove(N), this._mouseUpListener = (N) => this._handleMouseUp(N), this._coreService.onUserInput(() => {
            this.hasSelection && this.clearSelection();
          }), this._trimListener = this._bufferService.buffer.lines.onTrim((N) => this._handleTrim(N)), this.register(this._bufferService.buffers.onBufferActivate((N) => this._handleBufferActivate(N))), this.enable(), this._model = new v.SelectionModel(this._bufferService), this._activeSelectionMode = 0, this.register((0, e.toDisposable)(() => {
            this._removeMouseDownListeners();
          }));
        }
        reset() {
          this.clearSelection();
        }
        disable() {
          this.clearSelection(), this._enabled = !1;
        }
        enable() {
          this._enabled = !0;
        }
        get selectionStart() {
          return this._model.finalSelectionStart;
        }
        get selectionEnd() {
          return this._model.finalSelectionEnd;
        }
        get hasSelection() {
          const c = this._model.finalSelectionStart, p = this._model.finalSelectionEnd;
          return !(!c || !p || c[0] === p[0] && c[1] === p[1]);
        }
        get selectionText() {
          const c = this._model.finalSelectionStart, p = this._model.finalSelectionEnd;
          if (!c || !p)
            return "";
          const L = this._bufferService.buffer, M = [];
          if (this._activeSelectionMode === 3) {
            if (c[0] === p[0])
              return "";
            const D = c[0] < p[0] ? c[0] : p[0], T = c[0] < p[0] ? p[0] : c[0];
            for (let I = c[1]; I <= p[1]; I++) {
              const F = L.translateBufferLineToString(I, !0, D, T);
              M.push(F);
            }
          } else {
            const D = c[1] === p[1] ? p[0] : void 0;
            M.push(L.translateBufferLineToString(c[1], !0, c[0], D));
            for (let T = c[1] + 1; T <= p[1] - 1; T++) {
              const I = L.lines.get(T), F = L.translateBufferLineToString(T, !0);
              I != null && I.isWrapped ? M[M.length - 1] += F : M.push(F);
            }
            if (c[1] !== p[1]) {
              const T = L.lines.get(p[1]), I = L.translateBufferLineToString(p[1], !0, 0, p[0]);
              T && T.isWrapped ? M[M.length - 1] += I : M.push(I);
            }
          }
          return M.map((D) => D.replace(f, " ")).join(r.isWindows ? `\r
` : `
`);
        }
        clearSelection() {
          this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
        }
        refresh(c) {
          this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), r.isLinux && c && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
        }
        _refresh() {
          this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: this._activeSelectionMode === 3 });
        }
        _isClickInSelection(c) {
          const p = this._getMouseBufferCoords(c), L = this._model.finalSelectionStart, M = this._model.finalSelectionEnd;
          return !!(L && M && p) && this._areCoordsInSelection(p, L, M);
        }
        isCellInSelection(c, p) {
          const L = this._model.finalSelectionStart, M = this._model.finalSelectionEnd;
          return !(!L || !M) && this._areCoordsInSelection([c, p], L, M);
        }
        _areCoordsInSelection(c, p, L) {
          return c[1] > p[1] && c[1] < L[1] || p[1] === L[1] && c[1] === p[1] && c[0] >= p[0] && c[0] < L[0] || p[1] < L[1] && c[1] === L[1] && c[0] < L[0] || p[1] < L[1] && c[1] === p[1] && c[0] >= p[0];
        }
        _selectWordAtCursor(c, p) {
          var L, M;
          const D = (M = (L = this._linkifier.currentLink) === null || L === void 0 ? void 0 : L.link) === null || M === void 0 ? void 0 : M.range;
          if (D)
            return this._model.selectionStart = [D.start.x - 1, D.start.y - 1], this._model.selectionStartLength = (0, s.getRangeLength)(D, this._bufferService.cols), this._model.selectionEnd = void 0, !0;
          const T = this._getMouseBufferCoords(c);
          return !!T && (this._selectWordAt(T, p), this._model.selectionEnd = void 0, !0);
        }
        selectAll() {
          this._model.isSelectAllActive = !0, this.refresh(), this._onSelectionChange.fire();
        }
        selectLines(c, p) {
          this._model.clearSelection(), c = Math.max(c, 0), p = Math.min(p, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, c], this._model.selectionEnd = [this._bufferService.cols, p], this.refresh(), this._onSelectionChange.fire();
        }
        _handleTrim(c) {
          this._model.handleTrim(c) && this.refresh();
        }
        _getMouseBufferCoords(c) {
          const p = this._mouseService.getCoords(c, this._screenElement, this._bufferService.cols, this._bufferService.rows, !0);
          if (p)
            return p[0]--, p[1]--, p[1] += this._bufferService.buffer.ydisp, p;
        }
        _getMouseEventScrollAmount(c) {
          let p = (0, a.getCoordsRelativeToElement)(this._coreBrowserService.window, c, this._screenElement)[1];
          const L = this._renderService.dimensions.css.canvas.height;
          return p >= 0 && p <= L ? 0 : (p > L && (p -= L), p = Math.min(Math.max(p, -50), 50), p /= 50, p / Math.abs(p) + Math.round(14 * p));
        }
        shouldForceSelection(c) {
          return r.isMac ? c.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : c.shiftKey;
        }
        handleMouseDown(c) {
          if (this._mouseDownTimeStamp = c.timeStamp, (c.button !== 2 || !this.hasSelection) && c.button === 0) {
            if (!this._enabled) {
              if (!this.shouldForceSelection(c))
                return;
              c.stopPropagation();
            }
            c.preventDefault(), this._dragScrollAmount = 0, this._enabled && c.shiftKey ? this._handleIncrementalClick(c) : c.detail === 1 ? this._handleSingleClick(c) : c.detail === 2 ? this._handleDoubleClick(c) : c.detail === 3 && this._handleTripleClick(c), this._addMouseDownListeners(), this.refresh(!0);
          }
        }
        _addMouseDownListeners() {
          this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), 50);
        }
        _removeMouseDownListeners() {
          this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
        }
        _handleIncrementalClick(c) {
          this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(c));
        }
        _handleSingleClick(c) {
          if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = !1, this._activeSelectionMode = this.shouldColumnSelect(c) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(c), !this._model.selectionStart)
            return;
          this._model.selectionEnd = void 0;
          const p = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
          p && p.length !== this._model.selectionStart[0] && p.hasWidth(this._model.selectionStart[0]) === 0 && this._model.selectionStart[0]++;
        }
        _handleDoubleClick(c) {
          this._selectWordAtCursor(c, !0) && (this._activeSelectionMode = 1);
        }
        _handleTripleClick(c) {
          const p = this._getMouseBufferCoords(c);
          p && (this._activeSelectionMode = 2, this._selectLineAt(p[1]));
        }
        shouldColumnSelect(c) {
          return c.altKey && !(r.isMac && this._optionsService.rawOptions.macOptionClickForcesSelection);
        }
        _handleMouseMove(c) {
          if (c.stopImmediatePropagation(), !this._model.selectionStart)
            return;
          const p = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
          if (this._model.selectionEnd = this._getMouseBufferCoords(c), !this._model.selectionEnd)
            return void this.refresh(!0);
          this._activeSelectionMode === 2 ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : this._activeSelectionMode === 1 && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(c), this._activeSelectionMode !== 3 && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
          const L = this._bufferService.buffer;
          if (this._model.selectionEnd[1] < L.lines.length) {
            const M = L.lines.get(this._model.selectionEnd[1]);
            M && M.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0]++;
          }
          p && p[0] === this._model.selectionEnd[0] && p[1] === this._model.selectionEnd[1] || this.refresh(!0);
        }
        _dragScroll() {
          if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
            this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: !1 });
            const c = this._bufferService.buffer;
            this._dragScrollAmount > 0 ? (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(c.ydisp + this._bufferService.rows, c.lines.length - 1)) : (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = c.ydisp), this.refresh();
          }
        }
        _handleMouseUp(c) {
          const p = c.timeStamp - this._mouseDownTimeStamp;
          if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && p < 500 && c.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
            if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
              const L = this._mouseService.getCoords(c, this._element, this._bufferService.cols, this._bufferService.rows, !1);
              if (L && L[0] !== void 0 && L[1] !== void 0) {
                const M = (0, d.moveToCellSequence)(L[0] - 1, L[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
                this._coreService.triggerDataEvent(M, !0);
              }
            }
          } else
            this._fireEventIfSelectionChanged();
        }
        _fireEventIfSelectionChanged() {
          const c = this._model.finalSelectionStart, p = this._model.finalSelectionEnd, L = !(!c || !p || c[0] === p[0] && c[1] === p[1]);
          L ? c && p && (this._oldSelectionStart && this._oldSelectionEnd && c[0] === this._oldSelectionStart[0] && c[1] === this._oldSelectionStart[1] && p[0] === this._oldSelectionEnd[0] && p[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(c, p, L)) : this._oldHasSelection && this._fireOnSelectionChange(c, p, L);
        }
        _fireOnSelectionChange(c, p, L) {
          this._oldSelectionStart = c, this._oldSelectionEnd = p, this._oldHasSelection = L, this._onSelectionChange.fire();
        }
        _handleBufferActivate(c) {
          this.clearSelection(), this._trimListener.dispose(), this._trimListener = c.activeBuffer.lines.onTrim((p) => this._handleTrim(p));
        }
        _convertViewportColToCharacterIndex(c, p) {
          let L = p;
          for (let M = 0; p >= M; M++) {
            const D = c.loadCell(M, this._workCell).getChars().length;
            this._workCell.getWidth() === 0 ? L-- : D > 1 && p !== M && (L += D - 1);
          }
          return L;
        }
        setSelection(c, p, L) {
          this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [c, p], this._model.selectionStartLength = L, this.refresh(), this._fireEventIfSelectionChanged();
        }
        rightClickSelect(c) {
          this._isClickInSelection(c) || (this._selectWordAtCursor(c, !1) && this.refresh(!0), this._fireEventIfSelectionChanged());
        }
        _getWordAt(c, p, L = !0, M = !0) {
          if (c[0] >= this._bufferService.cols)
            return;
          const D = this._bufferService.buffer, T = D.lines.get(c[1]);
          if (!T)
            return;
          const I = D.translateBufferLineToString(c[1], !1);
          let F = this._convertViewportColToCharacterIndex(T, c[0]), j = F;
          const N = c[0] - F;
          let C = 0, R = 0, A = 0, O = 0;
          if (I.charAt(F) === " ") {
            for (; F > 0 && I.charAt(F - 1) === " "; )
              F--;
            for (; j < I.length && I.charAt(j + 1) === " "; )
              j++;
          } else {
            let V = c[0], K = c[0];
            T.getWidth(V) === 0 && (C++, V--), T.getWidth(K) === 2 && (R++, K++);
            const Q = T.getString(K).length;
            for (Q > 1 && (O += Q - 1, j += Q - 1); V > 0 && F > 0 && !this._isCharWordSeparator(T.loadCell(V - 1, this._workCell)); ) {
              T.loadCell(V - 1, this._workCell);
              const w = this._workCell.getChars().length;
              this._workCell.getWidth() === 0 ? (C++, V--) : w > 1 && (A += w - 1, F -= w - 1), F--, V--;
            }
            for (; K < T.length && j + 1 < I.length && !this._isCharWordSeparator(T.loadCell(K + 1, this._workCell)); ) {
              T.loadCell(K + 1, this._workCell);
              const w = this._workCell.getChars().length;
              this._workCell.getWidth() === 2 ? (R++, K++) : w > 1 && (O += w - 1, j += w - 1), j++, K++;
            }
          }
          j++;
          let z = F + N - C + A, H = Math.min(this._bufferService.cols, j - F + C + R - A - O);
          if (p || I.slice(F, j).trim() !== "") {
            if (L && z === 0 && T.getCodePoint(0) !== 32) {
              const V = D.lines.get(c[1] - 1);
              if (V && T.isWrapped && V.getCodePoint(this._bufferService.cols - 1) !== 32) {
                const K = this._getWordAt([this._bufferService.cols - 1, c[1] - 1], !1, !0, !1);
                if (K) {
                  const Q = this._bufferService.cols - K.start;
                  z -= Q, H += Q;
                }
              }
            }
            if (M && z + H === this._bufferService.cols && T.getCodePoint(this._bufferService.cols - 1) !== 32) {
              const V = D.lines.get(c[1] + 1);
              if (V != null && V.isWrapped && V.getCodePoint(0) !== 32) {
                const K = this._getWordAt([0, c[1] + 1], !1, !1, !0);
                K && (H += K.length);
              }
            }
            return { start: z, length: H };
          }
        }
        _selectWordAt(c, p) {
          const L = this._getWordAt(c, p);
          if (L) {
            for (; L.start < 0; )
              L.start += this._bufferService.cols, c[1]--;
            this._model.selectionStart = [L.start, c[1]], this._model.selectionStartLength = L.length;
          }
        }
        _selectToWordAt(c) {
          const p = this._getWordAt(c, !0);
          if (p) {
            let L = c[1];
            for (; p.start < 0; )
              p.start += this._bufferService.cols, L--;
            if (!this._model.areSelectionValuesReversed())
              for (; p.start + p.length > this._bufferService.cols; )
                p.length -= this._bufferService.cols, L++;
            this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? p.start : p.start + p.length, L];
          }
        }
        _isCharWordSeparator(c) {
          return c.getWidth() !== 0 && this._optionsService.rawOptions.wordSeparator.indexOf(c.getChars()) >= 0;
        }
        _selectLineAt(c) {
          const p = this._bufferService.buffer.getWrappedRangeForLine(c), L = { start: { x: 0, y: p.first }, end: { x: this._bufferService.cols - 1, y: p.last } };
          this._model.selectionStart = [0, p.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = (0, s.getRangeLength)(L, this._bufferService.cols);
        }
      };
      t.SelectionService = b = o([_(3, l.IBufferService), _(4, l.ICoreService), _(5, g.IMouseService), _(6, l.IOptionsService), _(7, g.IRenderService), _(8, g.ICoreBrowserService)], b);
    }, 4725: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.IThemeService = t.ICharacterJoinerService = t.ISelectionService = t.IRenderService = t.IMouseService = t.ICoreBrowserService = t.ICharSizeService = void 0;
      const o = n(8343);
      t.ICharSizeService = (0, o.createDecorator)("CharSizeService"), t.ICoreBrowserService = (0, o.createDecorator)("CoreBrowserService"), t.IMouseService = (0, o.createDecorator)("MouseService"), t.IRenderService = (0, o.createDecorator)("RenderService"), t.ISelectionService = (0, o.createDecorator)("SelectionService"), t.ICharacterJoinerService = (0, o.createDecorator)("CharacterJoinerService"), t.IThemeService = (0, o.createDecorator)("ThemeService");
    }, 6731: function(k, t, n) {
      var o = this && this.__decorate || function(b, c, p, L) {
        var M, D = arguments.length, T = D < 3 ? c : L === null ? L = Object.getOwnPropertyDescriptor(c, p) : L;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          T = Reflect.decorate(b, c, p, L);
        else
          for (var I = b.length - 1; I >= 0; I--)
            (M = b[I]) && (T = (D < 3 ? M(T) : D > 3 ? M(c, p, T) : M(c, p)) || T);
        return D > 3 && T && Object.defineProperty(c, p, T), T;
      }, _ = this && this.__param || function(b, c) {
        return function(p, L) {
          c(p, L, b);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ThemeService = t.DEFAULT_ANSI_COLORS = void 0;
      const a = n(7239), d = n(8055), v = n(8460), g = n(844), u = n(2585), e = d.css.toColor("#ffffff"), r = d.css.toColor("#000000"), s = d.css.toColor("#ffffff"), i = d.css.toColor("#000000"), l = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
      t.DEFAULT_ANSI_COLORS = Object.freeze((() => {
        const b = [d.css.toColor("#2e3436"), d.css.toColor("#cc0000"), d.css.toColor("#4e9a06"), d.css.toColor("#c4a000"), d.css.toColor("#3465a4"), d.css.toColor("#75507b"), d.css.toColor("#06989a"), d.css.toColor("#d3d7cf"), d.css.toColor("#555753"), d.css.toColor("#ef2929"), d.css.toColor("#8ae234"), d.css.toColor("#fce94f"), d.css.toColor("#729fcf"), d.css.toColor("#ad7fa8"), d.css.toColor("#34e2e2"), d.css.toColor("#eeeeec")], c = [0, 95, 135, 175, 215, 255];
        for (let p = 0; p < 216; p++) {
          const L = c[p / 36 % 6 | 0], M = c[p / 6 % 6 | 0], D = c[p % 6];
          b.push({ css: d.channels.toCss(L, M, D), rgba: d.channels.toRgba(L, M, D) });
        }
        for (let p = 0; p < 24; p++) {
          const L = 8 + 10 * p;
          b.push({ css: d.channels.toCss(L, L, L), rgba: d.channels.toRgba(L, L, L) });
        }
        return b;
      })());
      let h = t.ThemeService = class extends g.Disposable {
        get colors() {
          return this._colors;
        }
        constructor(b) {
          super(), this._optionsService = b, this._contrastCache = new a.ColorContrastCache(), this._halfContrastCache = new a.ColorContrastCache(), this._onChangeColors = this.register(new v.EventEmitter()), this.onChangeColors = this._onChangeColors.event, this._colors = { foreground: e, background: r, cursor: s, cursorAccent: i, selectionForeground: void 0, selectionBackgroundTransparent: l, selectionBackgroundOpaque: d.color.blend(r, l), selectionInactiveBackgroundTransparent: l, selectionInactiveBackgroundOpaque: d.color.blend(r, l), ansi: t.DEFAULT_ANSI_COLORS.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this.register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
        }
        _setTheme(b = {}) {
          const c = this._colors;
          if (c.foreground = f(b.foreground, e), c.background = f(b.background, r), c.cursor = f(b.cursor, s), c.cursorAccent = f(b.cursorAccent, i), c.selectionBackgroundTransparent = f(b.selectionBackground, l), c.selectionBackgroundOpaque = d.color.blend(c.background, c.selectionBackgroundTransparent), c.selectionInactiveBackgroundTransparent = f(b.selectionInactiveBackground, c.selectionBackgroundTransparent), c.selectionInactiveBackgroundOpaque = d.color.blend(c.background, c.selectionInactiveBackgroundTransparent), c.selectionForeground = b.selectionForeground ? f(b.selectionForeground, d.NULL_COLOR) : void 0, c.selectionForeground === d.NULL_COLOR && (c.selectionForeground = void 0), d.color.isOpaque(c.selectionBackgroundTransparent) && (c.selectionBackgroundTransparent = d.color.opacity(c.selectionBackgroundTransparent, 0.3)), d.color.isOpaque(c.selectionInactiveBackgroundTransparent) && (c.selectionInactiveBackgroundTransparent = d.color.opacity(c.selectionInactiveBackgroundTransparent, 0.3)), c.ansi = t.DEFAULT_ANSI_COLORS.slice(), c.ansi[0] = f(b.black, t.DEFAULT_ANSI_COLORS[0]), c.ansi[1] = f(b.red, t.DEFAULT_ANSI_COLORS[1]), c.ansi[2] = f(b.green, t.DEFAULT_ANSI_COLORS[2]), c.ansi[3] = f(b.yellow, t.DEFAULT_ANSI_COLORS[3]), c.ansi[4] = f(b.blue, t.DEFAULT_ANSI_COLORS[4]), c.ansi[5] = f(b.magenta, t.DEFAULT_ANSI_COLORS[5]), c.ansi[6] = f(b.cyan, t.DEFAULT_ANSI_COLORS[6]), c.ansi[7] = f(b.white, t.DEFAULT_ANSI_COLORS[7]), c.ansi[8] = f(b.brightBlack, t.DEFAULT_ANSI_COLORS[8]), c.ansi[9] = f(b.brightRed, t.DEFAULT_ANSI_COLORS[9]), c.ansi[10] = f(b.brightGreen, t.DEFAULT_ANSI_COLORS[10]), c.ansi[11] = f(b.brightYellow, t.DEFAULT_ANSI_COLORS[11]), c.ansi[12] = f(b.brightBlue, t.DEFAULT_ANSI_COLORS[12]), c.ansi[13] = f(b.brightMagenta, t.DEFAULT_ANSI_COLORS[13]), c.ansi[14] = f(b.brightCyan, t.DEFAULT_ANSI_COLORS[14]), c.ansi[15] = f(b.brightWhite, t.DEFAULT_ANSI_COLORS[15]), b.extendedAnsi) {
            const p = Math.min(c.ansi.length - 16, b.extendedAnsi.length);
            for (let L = 0; L < p; L++)
              c.ansi[L + 16] = f(b.extendedAnsi[L], t.DEFAULT_ANSI_COLORS[L + 16]);
          }
          this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
        }
        restoreColor(b) {
          this._restoreColor(b), this._onChangeColors.fire(this.colors);
        }
        _restoreColor(b) {
          if (b !== void 0)
            switch (b) {
              case 256:
                this._colors.foreground = this._restoreColors.foreground;
                break;
              case 257:
                this._colors.background = this._restoreColors.background;
                break;
              case 258:
                this._colors.cursor = this._restoreColors.cursor;
                break;
              default:
                this._colors.ansi[b] = this._restoreColors.ansi[b];
            }
          else
            for (let c = 0; c < this._restoreColors.ansi.length; ++c)
              this._colors.ansi[c] = this._restoreColors.ansi[c];
        }
        modifyColors(b) {
          b(this._colors), this._onChangeColors.fire(this.colors);
        }
        _updateRestoreColors() {
          this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
        }
      };
      function f(b, c) {
        if (b !== void 0)
          try {
            return d.css.toColor(b);
          } catch {
          }
        return c;
      }
      t.ThemeService = h = o([_(0, u.IOptionsService)], h);
    }, 6349: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CircularList = void 0;
      const o = n(8460), _ = n(844);
      class a extends _.Disposable {
        constructor(v) {
          super(), this._maxLength = v, this.onDeleteEmitter = this.register(new o.EventEmitter()), this.onDelete = this.onDeleteEmitter.event, this.onInsertEmitter = this.register(new o.EventEmitter()), this.onInsert = this.onInsertEmitter.event, this.onTrimEmitter = this.register(new o.EventEmitter()), this.onTrim = this.onTrimEmitter.event, this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
        }
        get maxLength() {
          return this._maxLength;
        }
        set maxLength(v) {
          if (this._maxLength === v)
            return;
          const g = new Array(v);
          for (let u = 0; u < Math.min(v, this.length); u++)
            g[u] = this._array[this._getCyclicIndex(u)];
          this._array = g, this._maxLength = v, this._startIndex = 0;
        }
        get length() {
          return this._length;
        }
        set length(v) {
          if (v > this._length)
            for (let g = this._length; g < v; g++)
              this._array[g] = void 0;
          this._length = v;
        }
        get(v) {
          return this._array[this._getCyclicIndex(v)];
        }
        set(v, g) {
          this._array[this._getCyclicIndex(v)] = g;
        }
        push(v) {
          this._array[this._getCyclicIndex(this._length)] = v, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
        }
        recycle() {
          if (this._length !== this._maxLength)
            throw new Error("Can only recycle when the buffer is full");
          return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
        }
        get isFull() {
          return this._length === this._maxLength;
        }
        pop() {
          return this._array[this._getCyclicIndex(this._length-- - 1)];
        }
        splice(v, g, ...u) {
          if (g) {
            for (let e = v; e < this._length - g; e++)
              this._array[this._getCyclicIndex(e)] = this._array[this._getCyclicIndex(e + g)];
            this._length -= g, this.onDeleteEmitter.fire({ index: v, amount: g });
          }
          for (let e = this._length - 1; e >= v; e--)
            this._array[this._getCyclicIndex(e + u.length)] = this._array[this._getCyclicIndex(e)];
          for (let e = 0; e < u.length; e++)
            this._array[this._getCyclicIndex(v + e)] = u[e];
          if (u.length && this.onInsertEmitter.fire({ index: v, amount: u.length }), this._length + u.length > this._maxLength) {
            const e = this._length + u.length - this._maxLength;
            this._startIndex += e, this._length = this._maxLength, this.onTrimEmitter.fire(e);
          } else
            this._length += u.length;
        }
        trimStart(v) {
          v > this._length && (v = this._length), this._startIndex += v, this._length -= v, this.onTrimEmitter.fire(v);
        }
        shiftElements(v, g, u) {
          if (!(g <= 0)) {
            if (v < 0 || v >= this._length)
              throw new Error("start argument out of range");
            if (v + u < 0)
              throw new Error("Cannot shift elements in list beyond index 0");
            if (u > 0) {
              for (let r = g - 1; r >= 0; r--)
                this.set(v + r + u, this.get(v + r));
              const e = v + g + u - this._length;
              if (e > 0)
                for (this._length += e; this._length > this._maxLength; )
                  this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
            } else
              for (let e = 0; e < g; e++)
                this.set(v + e + u, this.get(v + e));
          }
        }
        _getCyclicIndex(v) {
          return (this._startIndex + v) % this._maxLength;
        }
      }
      t.CircularList = a;
    }, 1439: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.clone = void 0, t.clone = function n(o, _ = 5) {
        if (typeof o != "object")
          return o;
        const a = Array.isArray(o) ? [] : {};
        for (const d in o)
          a[d] = _ <= 1 ? o[d] : o[d] && n(o[d], _ - 1);
        return a;
      };
    }, 8055: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.contrastRatio = t.toPaddedHex = t.rgba = t.rgb = t.css = t.color = t.channels = t.NULL_COLOR = void 0;
      const o = n(6114);
      let _ = 0, a = 0, d = 0, v = 0;
      var g, u, e, r, s;
      function i(h) {
        const f = h.toString(16);
        return f.length < 2 ? "0" + f : f;
      }
      function l(h, f) {
        return h < f ? (f + 0.05) / (h + 0.05) : (h + 0.05) / (f + 0.05);
      }
      t.NULL_COLOR = { css: "#00000000", rgba: 0 }, function(h) {
        h.toCss = function(f, b, c, p) {
          return p !== void 0 ? `#${i(f)}${i(b)}${i(c)}${i(p)}` : `#${i(f)}${i(b)}${i(c)}`;
        }, h.toRgba = function(f, b, c, p = 255) {
          return (f << 24 | b << 16 | c << 8 | p) >>> 0;
        };
      }(g || (t.channels = g = {})), function(h) {
        function f(b, c) {
          return v = Math.round(255 * c), [_, a, d] = s.toChannels(b.rgba), { css: g.toCss(_, a, d, v), rgba: g.toRgba(_, a, d, v) };
        }
        h.blend = function(b, c) {
          if (v = (255 & c.rgba) / 255, v === 1)
            return { css: c.css, rgba: c.rgba };
          const p = c.rgba >> 24 & 255, L = c.rgba >> 16 & 255, M = c.rgba >> 8 & 255, D = b.rgba >> 24 & 255, T = b.rgba >> 16 & 255, I = b.rgba >> 8 & 255;
          return _ = D + Math.round((p - D) * v), a = T + Math.round((L - T) * v), d = I + Math.round((M - I) * v), { css: g.toCss(_, a, d), rgba: g.toRgba(_, a, d) };
        }, h.isOpaque = function(b) {
          return (255 & b.rgba) == 255;
        }, h.ensureContrastRatio = function(b, c, p) {
          const L = s.ensureContrastRatio(b.rgba, c.rgba, p);
          if (L)
            return s.toColor(L >> 24 & 255, L >> 16 & 255, L >> 8 & 255);
        }, h.opaque = function(b) {
          const c = (255 | b.rgba) >>> 0;
          return [_, a, d] = s.toChannels(c), { css: g.toCss(_, a, d), rgba: c };
        }, h.opacity = f, h.multiplyOpacity = function(b, c) {
          return v = 255 & b.rgba, f(b, v * c / 255);
        }, h.toColorRGB = function(b) {
          return [b.rgba >> 24 & 255, b.rgba >> 16 & 255, b.rgba >> 8 & 255];
        };
      }(u || (t.color = u = {})), function(h) {
        let f, b;
        if (!o.isNode) {
          const c = document.createElement("canvas");
          c.width = 1, c.height = 1;
          const p = c.getContext("2d", { willReadFrequently: !0 });
          p && (f = p, f.globalCompositeOperation = "copy", b = f.createLinearGradient(0, 0, 1, 1));
        }
        h.toColor = function(c) {
          if (c.match(/#[\da-f]{3,8}/i))
            switch (c.length) {
              case 4:
                return _ = parseInt(c.slice(1, 2).repeat(2), 16), a = parseInt(c.slice(2, 3).repeat(2), 16), d = parseInt(c.slice(3, 4).repeat(2), 16), s.toColor(_, a, d);
              case 5:
                return _ = parseInt(c.slice(1, 2).repeat(2), 16), a = parseInt(c.slice(2, 3).repeat(2), 16), d = parseInt(c.slice(3, 4).repeat(2), 16), v = parseInt(c.slice(4, 5).repeat(2), 16), s.toColor(_, a, d, v);
              case 7:
                return { css: c, rgba: (parseInt(c.slice(1), 16) << 8 | 255) >>> 0 };
              case 9:
                return { css: c, rgba: parseInt(c.slice(1), 16) >>> 0 };
            }
          const p = c.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
          if (p)
            return _ = parseInt(p[1]), a = parseInt(p[2]), d = parseInt(p[3]), v = Math.round(255 * (p[5] === void 0 ? 1 : parseFloat(p[5]))), s.toColor(_, a, d, v);
          if (!f || !b)
            throw new Error("css.toColor: Unsupported css format");
          if (f.fillStyle = b, f.fillStyle = c, typeof f.fillStyle != "string")
            throw new Error("css.toColor: Unsupported css format");
          if (f.fillRect(0, 0, 1, 1), [_, a, d, v] = f.getImageData(0, 0, 1, 1).data, v !== 255)
            throw new Error("css.toColor: Unsupported css format");
          return { rgba: g.toRgba(_, a, d, v), css: c };
        };
      }(e || (t.css = e = {})), function(h) {
        function f(b, c, p) {
          const L = b / 255, M = c / 255, D = p / 255;
          return 0.2126 * (L <= 0.03928 ? L / 12.92 : Math.pow((L + 0.055) / 1.055, 2.4)) + 0.7152 * (M <= 0.03928 ? M / 12.92 : Math.pow((M + 0.055) / 1.055, 2.4)) + 0.0722 * (D <= 0.03928 ? D / 12.92 : Math.pow((D + 0.055) / 1.055, 2.4));
        }
        h.relativeLuminance = function(b) {
          return f(b >> 16 & 255, b >> 8 & 255, 255 & b);
        }, h.relativeLuminance2 = f;
      }(r || (t.rgb = r = {})), function(h) {
        function f(c, p, L) {
          const M = c >> 24 & 255, D = c >> 16 & 255, T = c >> 8 & 255;
          let I = p >> 24 & 255, F = p >> 16 & 255, j = p >> 8 & 255, N = l(r.relativeLuminance2(I, F, j), r.relativeLuminance2(M, D, T));
          for (; N < L && (I > 0 || F > 0 || j > 0); )
            I -= Math.max(0, Math.ceil(0.1 * I)), F -= Math.max(0, Math.ceil(0.1 * F)), j -= Math.max(0, Math.ceil(0.1 * j)), N = l(r.relativeLuminance2(I, F, j), r.relativeLuminance2(M, D, T));
          return (I << 24 | F << 16 | j << 8 | 255) >>> 0;
        }
        function b(c, p, L) {
          const M = c >> 24 & 255, D = c >> 16 & 255, T = c >> 8 & 255;
          let I = p >> 24 & 255, F = p >> 16 & 255, j = p >> 8 & 255, N = l(r.relativeLuminance2(I, F, j), r.relativeLuminance2(M, D, T));
          for (; N < L && (I < 255 || F < 255 || j < 255); )
            I = Math.min(255, I + Math.ceil(0.1 * (255 - I))), F = Math.min(255, F + Math.ceil(0.1 * (255 - F))), j = Math.min(255, j + Math.ceil(0.1 * (255 - j))), N = l(r.relativeLuminance2(I, F, j), r.relativeLuminance2(M, D, T));
          return (I << 24 | F << 16 | j << 8 | 255) >>> 0;
        }
        h.ensureContrastRatio = function(c, p, L) {
          const M = r.relativeLuminance(c >> 8), D = r.relativeLuminance(p >> 8);
          if (l(M, D) < L) {
            if (D < M) {
              const F = f(c, p, L), j = l(M, r.relativeLuminance(F >> 8));
              if (j < L) {
                const N = b(c, p, L);
                return j > l(M, r.relativeLuminance(N >> 8)) ? F : N;
              }
              return F;
            }
            const T = b(c, p, L), I = l(M, r.relativeLuminance(T >> 8));
            if (I < L) {
              const F = f(c, p, L);
              return I > l(M, r.relativeLuminance(F >> 8)) ? T : F;
            }
            return T;
          }
        }, h.reduceLuminance = f, h.increaseLuminance = b, h.toChannels = function(c) {
          return [c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, 255 & c];
        }, h.toColor = function(c, p, L, M) {
          return { css: g.toCss(c, p, L, M), rgba: g.toRgba(c, p, L, M) };
        };
      }(s || (t.rgba = s = {})), t.toPaddedHex = i, t.contrastRatio = l;
    }, 8969: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CoreTerminal = void 0;
      const o = n(844), _ = n(2585), a = n(4348), d = n(7866), v = n(744), g = n(7302), u = n(6975), e = n(8460), r = n(1753), s = n(1480), i = n(7994), l = n(9282), h = n(5435), f = n(5981), b = n(2660);
      let c = !1;
      class p extends o.Disposable {
        get onScroll() {
          return this._onScrollApi || (this._onScrollApi = this.register(new e.EventEmitter()), this._onScroll.event((M) => {
            var D;
            (D = this._onScrollApi) === null || D === void 0 || D.fire(M.position);
          })), this._onScrollApi.event;
        }
        get cols() {
          return this._bufferService.cols;
        }
        get rows() {
          return this._bufferService.rows;
        }
        get buffers() {
          return this._bufferService.buffers;
        }
        get options() {
          return this.optionsService.options;
        }
        set options(M) {
          for (const D in M)
            this.optionsService.options[D] = M[D];
        }
        constructor(M) {
          super(), this._windowsWrappingHeuristics = this.register(new o.MutableDisposable()), this._onBinary = this.register(new e.EventEmitter()), this.onBinary = this._onBinary.event, this._onData = this.register(new e.EventEmitter()), this.onData = this._onData.event, this._onLineFeed = this.register(new e.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onResize = this.register(new e.EventEmitter()), this.onResize = this._onResize.event, this._onWriteParsed = this.register(new e.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event, this._onScroll = this.register(new e.EventEmitter()), this._instantiationService = new a.InstantiationService(), this.optionsService = this.register(new g.OptionsService(M)), this._instantiationService.setService(_.IOptionsService, this.optionsService), this._bufferService = this.register(this._instantiationService.createInstance(v.BufferService)), this._instantiationService.setService(_.IBufferService, this._bufferService), this._logService = this.register(this._instantiationService.createInstance(d.LogService)), this._instantiationService.setService(_.ILogService, this._logService), this.coreService = this.register(this._instantiationService.createInstance(u.CoreService)), this._instantiationService.setService(_.ICoreService, this.coreService), this.coreMouseService = this.register(this._instantiationService.createInstance(r.CoreMouseService)), this._instantiationService.setService(_.ICoreMouseService, this.coreMouseService), this.unicodeService = this.register(this._instantiationService.createInstance(s.UnicodeService)), this._instantiationService.setService(_.IUnicodeService, this.unicodeService), this._charsetService = this._instantiationService.createInstance(i.CharsetService), this._instantiationService.setService(_.ICharsetService, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(b.OscLinkService), this._instantiationService.setService(_.IOscLinkService, this._oscLinkService), this._inputHandler = this.register(new h.InputHandler(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this.register((0, e.forwardEvent)(this._inputHandler.onLineFeed, this._onLineFeed)), this.register(this._inputHandler), this.register((0, e.forwardEvent)(this._bufferService.onResize, this._onResize)), this.register((0, e.forwardEvent)(this.coreService.onData, this._onData)), this.register((0, e.forwardEvent)(this.coreService.onBinary, this._onBinary)), this.register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom())), this.register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this.register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this.register(this._bufferService.onScroll((D) => {
            this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
          })), this.register(this._inputHandler.onScroll((D) => {
            this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
          })), this._writeBuffer = this.register(new f.WriteBuffer((D, T) => this._inputHandler.parse(D, T))), this.register((0, e.forwardEvent)(this._writeBuffer.onWriteParsed, this._onWriteParsed));
        }
        write(M, D) {
          this._writeBuffer.write(M, D);
        }
        writeSync(M, D) {
          this._logService.logLevel <= _.LogLevelEnum.WARN && !c && (this._logService.warn("writeSync is unreliable and will be removed soon."), c = !0), this._writeBuffer.writeSync(M, D);
        }
        resize(M, D) {
          isNaN(M) || isNaN(D) || (M = Math.max(M, v.MINIMUM_COLS), D = Math.max(D, v.MINIMUM_ROWS), this._bufferService.resize(M, D));
        }
        scroll(M, D = !1) {
          this._bufferService.scroll(M, D);
        }
        scrollLines(M, D, T) {
          this._bufferService.scrollLines(M, D, T);
        }
        scrollPages(M) {
          this.scrollLines(M * (this.rows - 1));
        }
        scrollToTop() {
          this.scrollLines(-this._bufferService.buffer.ydisp);
        }
        scrollToBottom() {
          this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
        }
        scrollToLine(M) {
          const D = M - this._bufferService.buffer.ydisp;
          D !== 0 && this.scrollLines(D);
        }
        registerEscHandler(M, D) {
          return this._inputHandler.registerEscHandler(M, D);
        }
        registerDcsHandler(M, D) {
          return this._inputHandler.registerDcsHandler(M, D);
        }
        registerCsiHandler(M, D) {
          return this._inputHandler.registerCsiHandler(M, D);
        }
        registerOscHandler(M, D) {
          return this._inputHandler.registerOscHandler(M, D);
        }
        _setup() {
          this._handleWindowsPtyOptionChange();
        }
        reset() {
          this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
        }
        _handleWindowsPtyOptionChange() {
          let M = !1;
          const D = this.optionsService.rawOptions.windowsPty;
          D && D.buildNumber !== void 0 && D.buildNumber !== void 0 ? M = D.backend === "conpty" && D.buildNumber < 21376 : this.optionsService.rawOptions.windowsMode && (M = !0), M ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
        }
        _enableWindowsWrappingHeuristics() {
          if (!this._windowsWrappingHeuristics.value) {
            const M = [];
            M.push(this.onLineFeed(l.updateWindowsModeWrappedState.bind(null, this._bufferService))), M.push(this.registerCsiHandler({ final: "H" }, () => ((0, l.updateWindowsModeWrappedState)(this._bufferService), !1))), this._windowsWrappingHeuristics.value = (0, o.toDisposable)(() => {
              for (const D of M)
                D.dispose();
            });
          }
        }
      }
      t.CoreTerminal = p;
    }, 8460: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.forwardEvent = t.EventEmitter = void 0, t.EventEmitter = class {
        constructor() {
          this._listeners = [], this._disposed = !1;
        }
        get event() {
          return this._event || (this._event = (n) => (this._listeners.push(n), { dispose: () => {
            if (!this._disposed) {
              for (let o = 0; o < this._listeners.length; o++)
                if (this._listeners[o] === n)
                  return void this._listeners.splice(o, 1);
            }
          } })), this._event;
        }
        fire(n, o) {
          const _ = [];
          for (let a = 0; a < this._listeners.length; a++)
            _.push(this._listeners[a]);
          for (let a = 0; a < _.length; a++)
            _[a].call(void 0, n, o);
        }
        dispose() {
          this.clearListeners(), this._disposed = !0;
        }
        clearListeners() {
          this._listeners && (this._listeners.length = 0);
        }
      }, t.forwardEvent = function(n, o) {
        return n((_) => o.fire(_));
      };
    }, 5435: function(k, t, n) {
      var o = this && this.__decorate || function(N, C, R, A) {
        var O, z = arguments.length, H = z < 3 ? C : A === null ? A = Object.getOwnPropertyDescriptor(C, R) : A;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          H = Reflect.decorate(N, C, R, A);
        else
          for (var V = N.length - 1; V >= 0; V--)
            (O = N[V]) && (H = (z < 3 ? O(H) : z > 3 ? O(C, R, H) : O(C, R)) || H);
        return z > 3 && H && Object.defineProperty(C, R, H), H;
      }, _ = this && this.__param || function(N, C) {
        return function(R, A) {
          C(R, A, N);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.InputHandler = t.WindowsOptionsReportType = void 0;
      const a = n(2584), d = n(7116), v = n(2015), g = n(844), u = n(482), e = n(8437), r = n(8460), s = n(643), i = n(511), l = n(3734), h = n(2585), f = n(6242), b = n(6351), c = n(5941), p = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 }, L = 131072;
      function M(N, C) {
        if (N > 24)
          return C.setWinLines || !1;
        switch (N) {
          case 1:
            return !!C.restoreWin;
          case 2:
            return !!C.minimizeWin;
          case 3:
            return !!C.setWinPosition;
          case 4:
            return !!C.setWinSizePixels;
          case 5:
            return !!C.raiseWin;
          case 6:
            return !!C.lowerWin;
          case 7:
            return !!C.refreshWin;
          case 8:
            return !!C.setWinSizeChars;
          case 9:
            return !!C.maximizeWin;
          case 10:
            return !!C.fullscreenWin;
          case 11:
            return !!C.getWinState;
          case 13:
            return !!C.getWinPosition;
          case 14:
            return !!C.getWinSizePixels;
          case 15:
            return !!C.getScreenSizePixels;
          case 16:
            return !!C.getCellSizePixels;
          case 18:
            return !!C.getWinSizeChars;
          case 19:
            return !!C.getScreenSizeChars;
          case 20:
            return !!C.getIconTitle;
          case 21:
            return !!C.getWinTitle;
          case 22:
            return !!C.pushTitle;
          case 23:
            return !!C.popTitle;
          case 24:
            return !!C.setWinLines;
        }
        return !1;
      }
      var D;
      (function(N) {
        N[N.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS", N[N.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
      })(D || (t.WindowsOptionsReportType = D = {}));
      let T = 0;
      class I extends g.Disposable {
        getAttrData() {
          return this._curAttrData;
        }
        constructor(C, R, A, O, z, H, V, K, Q = new v.EscapeSequenceParser()) {
          super(), this._bufferService = C, this._charsetService = R, this._coreService = A, this._logService = O, this._optionsService = z, this._oscLinkService = H, this._coreMouseService = V, this._unicodeService = K, this._parser = Q, this._parseBuffer = new Uint32Array(4096), this._stringDecoder = new u.StringToUtf32(), this._utf8Decoder = new u.Utf8ToUtf32(), this._workCell = new i.CellData(), this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = e.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = e.DEFAULT_ATTR_DATA.clone(), this._onRequestBell = this.register(new r.EventEmitter()), this.onRequestBell = this._onRequestBell.event, this._onRequestRefreshRows = this.register(new r.EventEmitter()), this.onRequestRefreshRows = this._onRequestRefreshRows.event, this._onRequestReset = this.register(new r.EventEmitter()), this.onRequestReset = this._onRequestReset.event, this._onRequestSendFocus = this.register(new r.EventEmitter()), this.onRequestSendFocus = this._onRequestSendFocus.event, this._onRequestSyncScrollBar = this.register(new r.EventEmitter()), this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event, this._onRequestWindowsOptionsReport = this.register(new r.EventEmitter()), this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event, this._onA11yChar = this.register(new r.EventEmitter()), this.onA11yChar = this._onA11yChar.event, this._onA11yTab = this.register(new r.EventEmitter()), this.onA11yTab = this._onA11yTab.event, this._onCursorMove = this.register(new r.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onLineFeed = this.register(new r.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onScroll = this.register(new r.EventEmitter()), this.onScroll = this._onScroll.event, this._onTitleChange = this.register(new r.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onColor = this.register(new r.EventEmitter()), this.onColor = this._onColor.event, this._parseStack = { paused: !1, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 }, this._specialColors = [256, 257, 258], this.register(this._parser), this._dirtyRowTracker = new F(this._bufferService), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((w) => this._activeBuffer = w.activeBuffer)), this._parser.setCsiHandlerFallback((w, P) => {
            this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(w), params: P.toArray() });
          }), this._parser.setEscHandlerFallback((w) => {
            this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(w) });
          }), this._parser.setExecuteHandlerFallback((w) => {
            this._logService.debug("Unknown EXECUTE code: ", { code: w });
          }), this._parser.setOscHandlerFallback((w, P, U) => {
            this._logService.debug("Unknown OSC code: ", { identifier: w, action: P, data: U });
          }), this._parser.setDcsHandlerFallback((w, P, U) => {
            P === "HOOK" && (U = U.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(w), action: P, payload: U });
          }), this._parser.setPrintHandler((w, P, U) => this.print(w, P, U)), this._parser.registerCsiHandler({ final: "@" }, (w) => this.insertChars(w)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (w) => this.scrollLeft(w)), this._parser.registerCsiHandler({ final: "A" }, (w) => this.cursorUp(w)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (w) => this.scrollRight(w)), this._parser.registerCsiHandler({ final: "B" }, (w) => this.cursorDown(w)), this._parser.registerCsiHandler({ final: "C" }, (w) => this.cursorForward(w)), this._parser.registerCsiHandler({ final: "D" }, (w) => this.cursorBackward(w)), this._parser.registerCsiHandler({ final: "E" }, (w) => this.cursorNextLine(w)), this._parser.registerCsiHandler({ final: "F" }, (w) => this.cursorPrecedingLine(w)), this._parser.registerCsiHandler({ final: "G" }, (w) => this.cursorCharAbsolute(w)), this._parser.registerCsiHandler({ final: "H" }, (w) => this.cursorPosition(w)), this._parser.registerCsiHandler({ final: "I" }, (w) => this.cursorForwardTab(w)), this._parser.registerCsiHandler({ final: "J" }, (w) => this.eraseInDisplay(w, !1)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (w) => this.eraseInDisplay(w, !0)), this._parser.registerCsiHandler({ final: "K" }, (w) => this.eraseInLine(w, !1)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (w) => this.eraseInLine(w, !0)), this._parser.registerCsiHandler({ final: "L" }, (w) => this.insertLines(w)), this._parser.registerCsiHandler({ final: "M" }, (w) => this.deleteLines(w)), this._parser.registerCsiHandler({ final: "P" }, (w) => this.deleteChars(w)), this._parser.registerCsiHandler({ final: "S" }, (w) => this.scrollUp(w)), this._parser.registerCsiHandler({ final: "T" }, (w) => this.scrollDown(w)), this._parser.registerCsiHandler({ final: "X" }, (w) => this.eraseChars(w)), this._parser.registerCsiHandler({ final: "Z" }, (w) => this.cursorBackwardTab(w)), this._parser.registerCsiHandler({ final: "`" }, (w) => this.charPosAbsolute(w)), this._parser.registerCsiHandler({ final: "a" }, (w) => this.hPositionRelative(w)), this._parser.registerCsiHandler({ final: "b" }, (w) => this.repeatPrecedingCharacter(w)), this._parser.registerCsiHandler({ final: "c" }, (w) => this.sendDeviceAttributesPrimary(w)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (w) => this.sendDeviceAttributesSecondary(w)), this._parser.registerCsiHandler({ final: "d" }, (w) => this.linePosAbsolute(w)), this._parser.registerCsiHandler({ final: "e" }, (w) => this.vPositionRelative(w)), this._parser.registerCsiHandler({ final: "f" }, (w) => this.hVPosition(w)), this._parser.registerCsiHandler({ final: "g" }, (w) => this.tabClear(w)), this._parser.registerCsiHandler({ final: "h" }, (w) => this.setMode(w)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (w) => this.setModePrivate(w)), this._parser.registerCsiHandler({ final: "l" }, (w) => this.resetMode(w)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (w) => this.resetModePrivate(w)), this._parser.registerCsiHandler({ final: "m" }, (w) => this.charAttributes(w)), this._parser.registerCsiHandler({ final: "n" }, (w) => this.deviceStatus(w)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (w) => this.deviceStatusPrivate(w)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (w) => this.softReset(w)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (w) => this.setCursorStyle(w)), this._parser.registerCsiHandler({ final: "r" }, (w) => this.setScrollRegion(w)), this._parser.registerCsiHandler({ final: "s" }, (w) => this.saveCursor(w)), this._parser.registerCsiHandler({ final: "t" }, (w) => this.windowOptions(w)), this._parser.registerCsiHandler({ final: "u" }, (w) => this.restoreCursor(w)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (w) => this.insertColumns(w)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (w) => this.deleteColumns(w)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (w) => this.selectProtected(w)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (w) => this.requestMode(w, !0)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (w) => this.requestMode(w, !1)), this._parser.setExecuteHandler(a.C0.BEL, () => this.bell()), this._parser.setExecuteHandler(a.C0.LF, () => this.lineFeed()), this._parser.setExecuteHandler(a.C0.VT, () => this.lineFeed()), this._parser.setExecuteHandler(a.C0.FF, () => this.lineFeed()), this._parser.setExecuteHandler(a.C0.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(a.C0.BS, () => this.backspace()), this._parser.setExecuteHandler(a.C0.HT, () => this.tab()), this._parser.setExecuteHandler(a.C0.SO, () => this.shiftOut()), this._parser.setExecuteHandler(a.C0.SI, () => this.shiftIn()), this._parser.setExecuteHandler(a.C1.IND, () => this.index()), this._parser.setExecuteHandler(a.C1.NEL, () => this.nextLine()), this._parser.setExecuteHandler(a.C1.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new f.OscHandler((w) => (this.setTitle(w), this.setIconName(w), !0))), this._parser.registerOscHandler(1, new f.OscHandler((w) => this.setIconName(w))), this._parser.registerOscHandler(2, new f.OscHandler((w) => this.setTitle(w))), this._parser.registerOscHandler(4, new f.OscHandler((w) => this.setOrReportIndexedColor(w))), this._parser.registerOscHandler(8, new f.OscHandler((w) => this.setHyperlink(w))), this._parser.registerOscHandler(10, new f.OscHandler((w) => this.setOrReportFgColor(w))), this._parser.registerOscHandler(11, new f.OscHandler((w) => this.setOrReportBgColor(w))), this._parser.registerOscHandler(12, new f.OscHandler((w) => this.setOrReportCursorColor(w))), this._parser.registerOscHandler(104, new f.OscHandler((w) => this.restoreIndexedColor(w))), this._parser.registerOscHandler(110, new f.OscHandler((w) => this.restoreFgColor(w))), this._parser.registerOscHandler(111, new f.OscHandler((w) => this.restoreBgColor(w))), this._parser.registerOscHandler(112, new f.OscHandler((w) => this.restoreCursorColor(w))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
          for (const w in d.CHARSETS)
            this._parser.registerEscHandler({ intermediates: "(", final: w }, () => this.selectCharset("(" + w)), this._parser.registerEscHandler({ intermediates: ")", final: w }, () => this.selectCharset(")" + w)), this._parser.registerEscHandler({ intermediates: "*", final: w }, () => this.selectCharset("*" + w)), this._parser.registerEscHandler({ intermediates: "+", final: w }, () => this.selectCharset("+" + w)), this._parser.registerEscHandler({ intermediates: "-", final: w }, () => this.selectCharset("-" + w)), this._parser.registerEscHandler({ intermediates: ".", final: w }, () => this.selectCharset("." + w)), this._parser.registerEscHandler({ intermediates: "/", final: w }, () => this.selectCharset("/" + w));
          this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((w) => (this._logService.error("Parsing error: ", w), w)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new b.DcsHandler((w, P) => this.requestStatusString(w, P)));
        }
        _preserveStack(C, R, A, O) {
          this._parseStack.paused = !0, this._parseStack.cursorStartX = C, this._parseStack.cursorStartY = R, this._parseStack.decodedLength = A, this._parseStack.position = O;
        }
        _logSlowResolvingAsync(C) {
          this._logService.logLevel <= h.LogLevelEnum.WARN && Promise.race([C, new Promise((R, A) => setTimeout(() => A("#SLOW_TIMEOUT"), 5e3))]).catch((R) => {
            if (R !== "#SLOW_TIMEOUT")
              throw R;
            console.warn("async parser handler taking longer than 5000 ms");
          });
        }
        _getCurrentLinkId() {
          return this._curAttrData.extended.urlId;
        }
        parse(C, R) {
          let A, O = this._activeBuffer.x, z = this._activeBuffer.y, H = 0;
          const V = this._parseStack.paused;
          if (V) {
            if (A = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, R))
              return this._logSlowResolvingAsync(A), A;
            O = this._parseStack.cursorStartX, z = this._parseStack.cursorStartY, this._parseStack.paused = !1, C.length > L && (H = this._parseStack.position + L);
          }
          if (this._logService.logLevel <= h.LogLevelEnum.DEBUG && this._logService.debug("parsing data" + (typeof C == "string" ? ` "${C}"` : ` "${Array.prototype.map.call(C, (K) => String.fromCharCode(K)).join("")}"`), typeof C == "string" ? C.split("").map((K) => K.charCodeAt(0)) : C), this._parseBuffer.length < C.length && this._parseBuffer.length < L && (this._parseBuffer = new Uint32Array(Math.min(C.length, L))), V || this._dirtyRowTracker.clearRange(), C.length > L)
            for (let K = H; K < C.length; K += L) {
              const Q = K + L < C.length ? K + L : C.length, w = typeof C == "string" ? this._stringDecoder.decode(C.substring(K, Q), this._parseBuffer) : this._utf8Decoder.decode(C.subarray(K, Q), this._parseBuffer);
              if (A = this._parser.parse(this._parseBuffer, w))
                return this._preserveStack(O, z, w, K), this._logSlowResolvingAsync(A), A;
            }
          else if (!V) {
            const K = typeof C == "string" ? this._stringDecoder.decode(C, this._parseBuffer) : this._utf8Decoder.decode(C, this._parseBuffer);
            if (A = this._parser.parse(this._parseBuffer, K))
              return this._preserveStack(O, z, K, 0), this._logSlowResolvingAsync(A), A;
          }
          this._activeBuffer.x === O && this._activeBuffer.y === z || this._onCursorMove.fire(), this._onRequestRefreshRows.fire(this._dirtyRowTracker.start, this._dirtyRowTracker.end);
        }
        print(C, R, A) {
          let O, z;
          const H = this._charsetService.charset, V = this._optionsService.rawOptions.screenReaderMode, K = this._bufferService.cols, Q = this._coreService.decPrivateModes.wraparound, w = this._coreService.modes.insertMode, P = this._curAttrData;
          let U = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && A - R > 0 && U.getWidth(this._activeBuffer.x - 1) === 2 && U.setCellFromCodePoint(this._activeBuffer.x - 1, 0, 1, P.fg, P.bg, P.extended);
          for (let W = R; W < A; ++W) {
            if (O = C[W], z = this._unicodeService.wcwidth(O), O < 127 && H) {
              const G = H[String.fromCharCode(O)];
              G && (O = G.charCodeAt(0));
            }
            if (V && this._onA11yChar.fire((0, u.stringFromCodePoint)(O)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), z || !this._activeBuffer.x) {
              if (this._activeBuffer.x + z - 1 >= K) {
                if (Q) {
                  for (; this._activeBuffer.x < K; )
                    U.setCellFromCodePoint(this._activeBuffer.x++, 0, 1, P.fg, P.bg, P.extended);
                  this._activeBuffer.x = 0, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), !0)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !0), U = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                } else if (this._activeBuffer.x = K - 1, z === 2)
                  continue;
              }
              if (w && (U.insertCells(this._activeBuffer.x, z, this._activeBuffer.getNullCell(P), P), U.getWidth(K - 1) === 2 && U.setCellFromCodePoint(K - 1, s.NULL_CELL_CODE, s.NULL_CELL_WIDTH, P.fg, P.bg, P.extended)), U.setCellFromCodePoint(this._activeBuffer.x++, O, z, P.fg, P.bg, P.extended), z > 0)
                for (; --z; )
                  U.setCellFromCodePoint(this._activeBuffer.x++, 0, 0, P.fg, P.bg, P.extended);
            } else
              U.getWidth(this._activeBuffer.x - 1) ? U.addCodepointToCell(this._activeBuffer.x - 1, O) : U.addCodepointToCell(this._activeBuffer.x - 2, O);
          }
          A - R > 0 && (U.loadCell(this._activeBuffer.x - 1, this._workCell), this._workCell.getWidth() === 2 || this._workCell.getCode() > 65535 ? this._parser.precedingCodepoint = 0 : this._workCell.isCombined() ? this._parser.precedingCodepoint = this._workCell.getChars().charCodeAt(0) : this._parser.precedingCodepoint = this._workCell.content), this._activeBuffer.x < K && A - R > 0 && U.getWidth(this._activeBuffer.x) === 0 && !U.hasContent(this._activeBuffer.x) && U.setCellFromCodePoint(this._activeBuffer.x, 0, 1, P.fg, P.bg, P.extended), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
        }
        registerCsiHandler(C, R) {
          return C.final !== "t" || C.prefix || C.intermediates ? this._parser.registerCsiHandler(C, R) : this._parser.registerCsiHandler(C, (A) => !M(A.params[0], this._optionsService.rawOptions.windowOptions) || R(A));
        }
        registerDcsHandler(C, R) {
          return this._parser.registerDcsHandler(C, new b.DcsHandler(R));
        }
        registerEscHandler(C, R) {
          return this._parser.registerEscHandler(C, R);
        }
        registerOscHandler(C, R) {
          return this._parser.registerOscHandler(C, new f.OscHandler(R));
        }
        bell() {
          return this._onRequestBell.fire(), !0;
        }
        lineFeed() {
          return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !1, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), !0;
        }
        carriageReturn() {
          return this._activeBuffer.x = 0, !0;
        }
        backspace() {
          var C;
          if (!this._coreService.decPrivateModes.reverseWraparound)
            return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, !0;
          if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0)
            this._activeBuffer.x--;
          else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && (!((C = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)) === null || C === void 0) && C.isWrapped)) {
            this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !1, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
            const R = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            R.hasWidth(this._activeBuffer.x) && !R.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
          }
          return this._restrictCursor(), !0;
        }
        tab() {
          if (this._activeBuffer.x >= this._bufferService.cols)
            return !0;
          const C = this._activeBuffer.x;
          return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - C), !0;
        }
        shiftOut() {
          return this._charsetService.setgLevel(1), !0;
        }
        shiftIn() {
          return this._charsetService.setgLevel(0), !0;
        }
        _restrictCursor(C = this._bufferService.cols - 1) {
          this._activeBuffer.x = Math.min(C, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
        }
        _setCursor(C, R) {
          this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = C, this._activeBuffer.y = this._activeBuffer.scrollTop + R) : (this._activeBuffer.x = C, this._activeBuffer.y = R), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
        }
        _moveCursor(C, R) {
          this._restrictCursor(), this._setCursor(this._activeBuffer.x + C, this._activeBuffer.y + R);
        }
        cursorUp(C) {
          const R = this._activeBuffer.y - this._activeBuffer.scrollTop;
          return R >= 0 ? this._moveCursor(0, -Math.min(R, C.params[0] || 1)) : this._moveCursor(0, -(C.params[0] || 1)), !0;
        }
        cursorDown(C) {
          const R = this._activeBuffer.scrollBottom - this._activeBuffer.y;
          return R >= 0 ? this._moveCursor(0, Math.min(R, C.params[0] || 1)) : this._moveCursor(0, C.params[0] || 1), !0;
        }
        cursorForward(C) {
          return this._moveCursor(C.params[0] || 1, 0), !0;
        }
        cursorBackward(C) {
          return this._moveCursor(-(C.params[0] || 1), 0), !0;
        }
        cursorNextLine(C) {
          return this.cursorDown(C), this._activeBuffer.x = 0, !0;
        }
        cursorPrecedingLine(C) {
          return this.cursorUp(C), this._activeBuffer.x = 0, !0;
        }
        cursorCharAbsolute(C) {
          return this._setCursor((C.params[0] || 1) - 1, this._activeBuffer.y), !0;
        }
        cursorPosition(C) {
          return this._setCursor(C.length >= 2 ? (C.params[1] || 1) - 1 : 0, (C.params[0] || 1) - 1), !0;
        }
        charPosAbsolute(C) {
          return this._setCursor((C.params[0] || 1) - 1, this._activeBuffer.y), !0;
        }
        hPositionRelative(C) {
          return this._moveCursor(C.params[0] || 1, 0), !0;
        }
        linePosAbsolute(C) {
          return this._setCursor(this._activeBuffer.x, (C.params[0] || 1) - 1), !0;
        }
        vPositionRelative(C) {
          return this._moveCursor(0, C.params[0] || 1), !0;
        }
        hVPosition(C) {
          return this.cursorPosition(C), !0;
        }
        tabClear(C) {
          const R = C.params[0];
          return R === 0 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : R === 3 && (this._activeBuffer.tabs = {}), !0;
        }
        cursorForwardTab(C) {
          if (this._activeBuffer.x >= this._bufferService.cols)
            return !0;
          let R = C.params[0] || 1;
          for (; R--; )
            this._activeBuffer.x = this._activeBuffer.nextStop();
          return !0;
        }
        cursorBackwardTab(C) {
          if (this._activeBuffer.x >= this._bufferService.cols)
            return !0;
          let R = C.params[0] || 1;
          for (; R--; )
            this._activeBuffer.x = this._activeBuffer.prevStop();
          return !0;
        }
        selectProtected(C) {
          const R = C.params[0];
          return R === 1 && (this._curAttrData.bg |= 536870912), R !== 2 && R !== 0 || (this._curAttrData.bg &= -536870913), !0;
        }
        _eraseInBufferLine(C, R, A, O = !1, z = !1) {
          const H = this._activeBuffer.lines.get(this._activeBuffer.ybase + C);
          H.replaceCells(R, A, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData(), z), O && (H.isWrapped = !1);
        }
        _resetBufferLine(C, R = !1) {
          const A = this._activeBuffer.lines.get(this._activeBuffer.ybase + C);
          A && (A.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), R), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + C), A.isWrapped = !1);
        }
        eraseInDisplay(C, R = !1) {
          let A;
          switch (this._restrictCursor(this._bufferService.cols), C.params[0]) {
            case 0:
              for (A = this._activeBuffer.y, this._dirtyRowTracker.markDirty(A), this._eraseInBufferLine(A++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, R); A < this._bufferService.rows; A++)
                this._resetBufferLine(A, R);
              this._dirtyRowTracker.markDirty(A);
              break;
            case 1:
              for (A = this._activeBuffer.y, this._dirtyRowTracker.markDirty(A), this._eraseInBufferLine(A, 0, this._activeBuffer.x + 1, !0, R), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(A + 1).isWrapped = !1); A--; )
                this._resetBufferLine(A, R);
              this._dirtyRowTracker.markDirty(0);
              break;
            case 2:
              for (A = this._bufferService.rows, this._dirtyRowTracker.markDirty(A - 1); A--; )
                this._resetBufferLine(A, R);
              this._dirtyRowTracker.markDirty(0);
              break;
            case 3:
              const O = this._activeBuffer.lines.length - this._bufferService.rows;
              O > 0 && (this._activeBuffer.lines.trimStart(O), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - O, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - O, 0), this._onScroll.fire(0));
          }
          return !0;
        }
        eraseInLine(C, R = !1) {
          switch (this._restrictCursor(this._bufferService.cols), C.params[0]) {
            case 0:
              this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, R);
              break;
            case 1:
              this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, !1, R);
              break;
            case 2:
              this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, !0, R);
          }
          return this._dirtyRowTracker.markDirty(this._activeBuffer.y), !0;
        }
        insertLines(C) {
          this._restrictCursor();
          let R = C.params[0] || 1;
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return !0;
          const A = this._activeBuffer.ybase + this._activeBuffer.y, O = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, z = this._bufferService.rows - 1 + this._activeBuffer.ybase - O + 1;
          for (; R--; )
            this._activeBuffer.lines.splice(z - 1, 1), this._activeBuffer.lines.splice(A, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
        }
        deleteLines(C) {
          this._restrictCursor();
          let R = C.params[0] || 1;
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return !0;
          const A = this._activeBuffer.ybase + this._activeBuffer.y;
          let O;
          for (O = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, O = this._bufferService.rows - 1 + this._activeBuffer.ybase - O; R--; )
            this._activeBuffer.lines.splice(A, 1), this._activeBuffer.lines.splice(O, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
        }
        insertChars(C) {
          this._restrictCursor();
          const R = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          return R && (R.insertCells(this._activeBuffer.x, C.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
        }
        deleteChars(C) {
          this._restrictCursor();
          const R = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          return R && (R.deleteCells(this._activeBuffer.x, C.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
        }
        scrollUp(C) {
          let R = C.params[0] || 1;
          for (; R--; )
            this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
        }
        scrollDown(C) {
          let R = C.params[0] || 1;
          for (; R--; )
            this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(e.DEFAULT_ATTR_DATA));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
        }
        scrollLeft(C) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return !0;
          const R = C.params[0] || 1;
          for (let A = this._activeBuffer.scrollTop; A <= this._activeBuffer.scrollBottom; ++A) {
            const O = this._activeBuffer.lines.get(this._activeBuffer.ybase + A);
            O.deleteCells(0, R, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), O.isWrapped = !1;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
        }
        scrollRight(C) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return !0;
          const R = C.params[0] || 1;
          for (let A = this._activeBuffer.scrollTop; A <= this._activeBuffer.scrollBottom; ++A) {
            const O = this._activeBuffer.lines.get(this._activeBuffer.ybase + A);
            O.insertCells(0, R, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), O.isWrapped = !1;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
        }
        insertColumns(C) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return !0;
          const R = C.params[0] || 1;
          for (let A = this._activeBuffer.scrollTop; A <= this._activeBuffer.scrollBottom; ++A) {
            const O = this._activeBuffer.lines.get(this._activeBuffer.ybase + A);
            O.insertCells(this._activeBuffer.x, R, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), O.isWrapped = !1;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
        }
        deleteColumns(C) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return !0;
          const R = C.params[0] || 1;
          for (let A = this._activeBuffer.scrollTop; A <= this._activeBuffer.scrollBottom; ++A) {
            const O = this._activeBuffer.lines.get(this._activeBuffer.ybase + A);
            O.deleteCells(this._activeBuffer.x, R, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), O.isWrapped = !1;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
        }
        eraseChars(C) {
          this._restrictCursor();
          const R = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          return R && (R.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (C.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
        }
        repeatPrecedingCharacter(C) {
          if (!this._parser.precedingCodepoint)
            return !0;
          const R = C.params[0] || 1, A = new Uint32Array(R);
          for (let O = 0; O < R; ++O)
            A[O] = this._parser.precedingCodepoint;
          return this.print(A, 0, A.length), !0;
        }
        sendDeviceAttributesPrimary(C) {
          return C.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(a.C0.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(a.C0.ESC + "[?6c")), !0;
        }
        sendDeviceAttributesSecondary(C) {
          return C.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(a.C0.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(a.C0.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(C.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(a.C0.ESC + "[>83;40003;0c")), !0;
        }
        _is(C) {
          return (this._optionsService.rawOptions.termName + "").indexOf(C) === 0;
        }
        setMode(C) {
          for (let R = 0; R < C.length; R++)
            switch (C.params[R]) {
              case 4:
                this._coreService.modes.insertMode = !0;
                break;
              case 20:
                this._optionsService.options.convertEol = !0;
            }
          return !0;
        }
        setModePrivate(C) {
          for (let R = 0; R < C.length; R++)
            switch (C.params[R]) {
              case 1:
                this._coreService.decPrivateModes.applicationCursorKeys = !0;
                break;
              case 2:
                this._charsetService.setgCharset(0, d.DEFAULT_CHARSET), this._charsetService.setgCharset(1, d.DEFAULT_CHARSET), this._charsetService.setgCharset(2, d.DEFAULT_CHARSET), this._charsetService.setgCharset(3, d.DEFAULT_CHARSET);
                break;
              case 3:
                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
                break;
              case 6:
                this._coreService.decPrivateModes.origin = !0, this._setCursor(0, 0);
                break;
              case 7:
                this._coreService.decPrivateModes.wraparound = !0;
                break;
              case 12:
                this._optionsService.options.cursorBlink = !0;
                break;
              case 45:
                this._coreService.decPrivateModes.reverseWraparound = !0;
                break;
              case 66:
                this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire();
                break;
              case 9:
                this._coreMouseService.activeProtocol = "X10";
                break;
              case 1e3:
                this._coreMouseService.activeProtocol = "VT200";
                break;
              case 1002:
                this._coreMouseService.activeProtocol = "DRAG";
                break;
              case 1003:
                this._coreMouseService.activeProtocol = "ANY";
                break;
              case 1004:
                this._coreService.decPrivateModes.sendFocus = !0, this._onRequestSendFocus.fire();
                break;
              case 1005:
                this._logService.debug("DECSET 1005 not supported (see #2507)");
                break;
              case 1006:
                this._coreMouseService.activeEncoding = "SGR";
                break;
              case 1015:
                this._logService.debug("DECSET 1015 not supported (see #2507)");
                break;
              case 1016:
                this._coreMouseService.activeEncoding = "SGR_PIXELS";
                break;
              case 25:
                this._coreService.isCursorHidden = !1;
                break;
              case 1048:
                this.saveCursor();
                break;
              case 1049:
                this.saveCursor();
              case 47:
              case 1047:
                this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                break;
              case 2004:
                this._coreService.decPrivateModes.bracketedPasteMode = !0;
            }
          return !0;
        }
        resetMode(C) {
          for (let R = 0; R < C.length; R++)
            switch (C.params[R]) {
              case 4:
                this._coreService.modes.insertMode = !1;
                break;
              case 20:
                this._optionsService.options.convertEol = !1;
            }
          return !0;
        }
        resetModePrivate(C) {
          for (let R = 0; R < C.length; R++)
            switch (C.params[R]) {
              case 1:
                this._coreService.decPrivateModes.applicationCursorKeys = !1;
                break;
              case 3:
                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
                break;
              case 6:
                this._coreService.decPrivateModes.origin = !1, this._setCursor(0, 0);
                break;
              case 7:
                this._coreService.decPrivateModes.wraparound = !1;
                break;
              case 12:
                this._optionsService.options.cursorBlink = !1;
                break;
              case 45:
                this._coreService.decPrivateModes.reverseWraparound = !1;
                break;
              case 66:
                this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire();
                break;
              case 9:
              case 1e3:
              case 1002:
              case 1003:
                this._coreMouseService.activeProtocol = "NONE";
                break;
              case 1004:
                this._coreService.decPrivateModes.sendFocus = !1;
                break;
              case 1005:
                this._logService.debug("DECRST 1005 not supported (see #2507)");
                break;
              case 1006:
              case 1016:
                this._coreMouseService.activeEncoding = "DEFAULT";
                break;
              case 1015:
                this._logService.debug("DECRST 1015 not supported (see #2507)");
                break;
              case 25:
                this._coreService.isCursorHidden = !0;
                break;
              case 1048:
                this.restoreCursor();
                break;
              case 1049:
              case 47:
              case 1047:
                this._bufferService.buffers.activateNormalBuffer(), C.params[R] === 1049 && this.restoreCursor(), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                break;
              case 2004:
                this._coreService.decPrivateModes.bracketedPasteMode = !1;
            }
          return !0;
        }
        requestMode(C, R) {
          const A = this._coreService.decPrivateModes, { activeProtocol: O, activeEncoding: z } = this._coreMouseService, H = this._coreService, { buffers: V, cols: K } = this._bufferService, { active: Q, alt: w } = V, P = this._optionsService.rawOptions, U = ($) => $ ? 1 : 2, W = C.params[0];
          return G = W, q = R ? W === 2 ? 4 : W === 4 ? U(H.modes.insertMode) : W === 12 ? 3 : W === 20 ? U(P.convertEol) : 0 : W === 1 ? U(A.applicationCursorKeys) : W === 3 ? P.windowOptions.setWinLines ? K === 80 ? 2 : K === 132 ? 1 : 0 : 0 : W === 6 ? U(A.origin) : W === 7 ? U(A.wraparound) : W === 8 ? 3 : W === 9 ? U(O === "X10") : W === 12 ? U(P.cursorBlink) : W === 25 ? U(!H.isCursorHidden) : W === 45 ? U(A.reverseWraparound) : W === 66 ? U(A.applicationKeypad) : W === 67 ? 4 : W === 1e3 ? U(O === "VT200") : W === 1002 ? U(O === "DRAG") : W === 1003 ? U(O === "ANY") : W === 1004 ? U(A.sendFocus) : W === 1005 ? 4 : W === 1006 ? U(z === "SGR") : W === 1015 ? 4 : W === 1016 ? U(z === "SGR_PIXELS") : W === 1048 ? 1 : W === 47 || W === 1047 || W === 1049 ? U(Q === w) : W === 2004 ? U(A.bracketedPasteMode) : 0, H.triggerDataEvent(`${a.C0.ESC}[${R ? "" : "?"}${G};${q}$y`), !0;
          var G, q;
        }
        _updateAttrColor(C, R, A, O, z) {
          return R === 2 ? (C |= 50331648, C &= -16777216, C |= l.AttributeData.fromColorRGB([A, O, z])) : R === 5 && (C &= -50331904, C |= 33554432 | 255 & A), C;
        }
        _extractColor(C, R, A) {
          const O = [0, 0, -1, 0, 0, 0];
          let z = 0, H = 0;
          do {
            if (O[H + z] = C.params[R + H], C.hasSubParams(R + H)) {
              const V = C.getSubParams(R + H);
              let K = 0;
              do
                O[1] === 5 && (z = 1), O[H + K + 1 + z] = V[K];
              while (++K < V.length && K + H + 1 + z < O.length);
              break;
            }
            if (O[1] === 5 && H + z >= 2 || O[1] === 2 && H + z >= 5)
              break;
            O[1] && (z = 1);
          } while (++H + R < C.length && H + z < O.length);
          for (let V = 2; V < O.length; ++V)
            O[V] === -1 && (O[V] = 0);
          switch (O[0]) {
            case 38:
              A.fg = this._updateAttrColor(A.fg, O[1], O[3], O[4], O[5]);
              break;
            case 48:
              A.bg = this._updateAttrColor(A.bg, O[1], O[3], O[4], O[5]);
              break;
            case 58:
              A.extended = A.extended.clone(), A.extended.underlineColor = this._updateAttrColor(A.extended.underlineColor, O[1], O[3], O[4], O[5]);
          }
          return H;
        }
        _processUnderline(C, R) {
          R.extended = R.extended.clone(), (!~C || C > 5) && (C = 1), R.extended.underlineStyle = C, R.fg |= 268435456, C === 0 && (R.fg &= -268435457), R.updateExtended();
        }
        _processSGR0(C) {
          C.fg = e.DEFAULT_ATTR_DATA.fg, C.bg = e.DEFAULT_ATTR_DATA.bg, C.extended = C.extended.clone(), C.extended.underlineStyle = 0, C.extended.underlineColor &= -67108864, C.updateExtended();
        }
        charAttributes(C) {
          if (C.length === 1 && C.params[0] === 0)
            return this._processSGR0(this._curAttrData), !0;
          const R = C.length;
          let A;
          const O = this._curAttrData;
          for (let z = 0; z < R; z++)
            A = C.params[z], A >= 30 && A <= 37 ? (O.fg &= -50331904, O.fg |= 16777216 | A - 30) : A >= 40 && A <= 47 ? (O.bg &= -50331904, O.bg |= 16777216 | A - 40) : A >= 90 && A <= 97 ? (O.fg &= -50331904, O.fg |= 16777224 | A - 90) : A >= 100 && A <= 107 ? (O.bg &= -50331904, O.bg |= 16777224 | A - 100) : A === 0 ? this._processSGR0(O) : A === 1 ? O.fg |= 134217728 : A === 3 ? O.bg |= 67108864 : A === 4 ? (O.fg |= 268435456, this._processUnderline(C.hasSubParams(z) ? C.getSubParams(z)[0] : 1, O)) : A === 5 ? O.fg |= 536870912 : A === 7 ? O.fg |= 67108864 : A === 8 ? O.fg |= 1073741824 : A === 9 ? O.fg |= 2147483648 : A === 2 ? O.bg |= 134217728 : A === 21 ? this._processUnderline(2, O) : A === 22 ? (O.fg &= -134217729, O.bg &= -134217729) : A === 23 ? O.bg &= -67108865 : A === 24 ? (O.fg &= -268435457, this._processUnderline(0, O)) : A === 25 ? O.fg &= -536870913 : A === 27 ? O.fg &= -67108865 : A === 28 ? O.fg &= -1073741825 : A === 29 ? O.fg &= 2147483647 : A === 39 ? (O.fg &= -67108864, O.fg |= 16777215 & e.DEFAULT_ATTR_DATA.fg) : A === 49 ? (O.bg &= -67108864, O.bg |= 16777215 & e.DEFAULT_ATTR_DATA.bg) : A === 38 || A === 48 || A === 58 ? z += this._extractColor(C, z, O) : A === 53 ? O.bg |= 1073741824 : A === 55 ? O.bg &= -1073741825 : A === 59 ? (O.extended = O.extended.clone(), O.extended.underlineColor = -1, O.updateExtended()) : A === 100 ? (O.fg &= -67108864, O.fg |= 16777215 & e.DEFAULT_ATTR_DATA.fg, O.bg &= -67108864, O.bg |= 16777215 & e.DEFAULT_ATTR_DATA.bg) : this._logService.debug("Unknown SGR attribute: %d.", A);
          return !0;
        }
        deviceStatus(C) {
          switch (C.params[0]) {
            case 5:
              this._coreService.triggerDataEvent(`${a.C0.ESC}[0n`);
              break;
            case 6:
              const R = this._activeBuffer.y + 1, A = this._activeBuffer.x + 1;
              this._coreService.triggerDataEvent(`${a.C0.ESC}[${R};${A}R`);
          }
          return !0;
        }
        deviceStatusPrivate(C) {
          if (C.params[0] === 6) {
            const R = this._activeBuffer.y + 1, A = this._activeBuffer.x + 1;
            this._coreService.triggerDataEvent(`${a.C0.ESC}[?${R};${A}R`);
          }
          return !0;
        }
        softReset(C) {
          return this._coreService.isCursorHidden = !1, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = e.DEFAULT_ATTR_DATA.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = !1, !0;
        }
        setCursorStyle(C) {
          const R = C.params[0] || 1;
          switch (R) {
            case 1:
            case 2:
              this._optionsService.options.cursorStyle = "block";
              break;
            case 3:
            case 4:
              this._optionsService.options.cursorStyle = "underline";
              break;
            case 5:
            case 6:
              this._optionsService.options.cursorStyle = "bar";
          }
          const A = R % 2 == 1;
          return this._optionsService.options.cursorBlink = A, !0;
        }
        setScrollRegion(C) {
          const R = C.params[0] || 1;
          let A;
          return (C.length < 2 || (A = C.params[1]) > this._bufferService.rows || A === 0) && (A = this._bufferService.rows), A > R && (this._activeBuffer.scrollTop = R - 1, this._activeBuffer.scrollBottom = A - 1, this._setCursor(0, 0)), !0;
        }
        windowOptions(C) {
          if (!M(C.params[0], this._optionsService.rawOptions.windowOptions))
            return !0;
          const R = C.length > 1 ? C.params[1] : 0;
          switch (C.params[0]) {
            case 14:
              R !== 2 && this._onRequestWindowsOptionsReport.fire(D.GET_WIN_SIZE_PIXELS);
              break;
            case 16:
              this._onRequestWindowsOptionsReport.fire(D.GET_CELL_SIZE_PIXELS);
              break;
            case 18:
              this._bufferService && this._coreService.triggerDataEvent(`${a.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
              break;
            case 22:
              R !== 0 && R !== 2 || (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > 10 && this._windowTitleStack.shift()), R !== 0 && R !== 1 || (this._iconNameStack.push(this._iconName), this._iconNameStack.length > 10 && this._iconNameStack.shift());
              break;
            case 23:
              R !== 0 && R !== 2 || this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), R !== 0 && R !== 1 || this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
          }
          return !0;
        }
        saveCursor(C) {
          return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, !0;
        }
        restoreCursor(C) {
          return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), !0;
        }
        setTitle(C) {
          return this._windowTitle = C, this._onTitleChange.fire(C), !0;
        }
        setIconName(C) {
          return this._iconName = C, !0;
        }
        setOrReportIndexedColor(C) {
          const R = [], A = C.split(";");
          for (; A.length > 1; ) {
            const O = A.shift(), z = A.shift();
            if (/^\d+$/.exec(O)) {
              const H = parseInt(O);
              if (j(H))
                if (z === "?")
                  R.push({ type: 0, index: H });
                else {
                  const V = (0, c.parseColor)(z);
                  V && R.push({ type: 1, index: H, color: V });
                }
            }
          }
          return R.length && this._onColor.fire(R), !0;
        }
        setHyperlink(C) {
          const R = C.split(";");
          return !(R.length < 2) && (R[1] ? this._createHyperlink(R[0], R[1]) : !R[0] && this._finishHyperlink());
        }
        _createHyperlink(C, R) {
          this._getCurrentLinkId() && this._finishHyperlink();
          const A = C.split(":");
          let O;
          const z = A.findIndex((H) => H.startsWith("id="));
          return z !== -1 && (O = A[z].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: O, uri: R }), this._curAttrData.updateExtended(), !0;
        }
        _finishHyperlink() {
          return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), !0;
        }
        _setOrReportSpecialColor(C, R) {
          const A = C.split(";");
          for (let O = 0; O < A.length && !(R >= this._specialColors.length); ++O, ++R)
            if (A[O] === "?")
              this._onColor.fire([{ type: 0, index: this._specialColors[R] }]);
            else {
              const z = (0, c.parseColor)(A[O]);
              z && this._onColor.fire([{ type: 1, index: this._specialColors[R], color: z }]);
            }
          return !0;
        }
        setOrReportFgColor(C) {
          return this._setOrReportSpecialColor(C, 0);
        }
        setOrReportBgColor(C) {
          return this._setOrReportSpecialColor(C, 1);
        }
        setOrReportCursorColor(C) {
          return this._setOrReportSpecialColor(C, 2);
        }
        restoreIndexedColor(C) {
          if (!C)
            return this._onColor.fire([{ type: 2 }]), !0;
          const R = [], A = C.split(";");
          for (let O = 0; O < A.length; ++O)
            if (/^\d+$/.exec(A[O])) {
              const z = parseInt(A[O]);
              j(z) && R.push({ type: 2, index: z });
            }
          return R.length && this._onColor.fire(R), !0;
        }
        restoreFgColor(C) {
          return this._onColor.fire([{ type: 2, index: 256 }]), !0;
        }
        restoreBgColor(C) {
          return this._onColor.fire([{ type: 2, index: 257 }]), !0;
        }
        restoreCursorColor(C) {
          return this._onColor.fire([{ type: 2, index: 258 }]), !0;
        }
        nextLine() {
          return this._activeBuffer.x = 0, this.index(), !0;
        }
        keypadApplicationMode() {
          return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire(), !0;
        }
        keypadNumericMode() {
          return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire(), !0;
        }
        selectDefaultCharset() {
          return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, d.DEFAULT_CHARSET), !0;
        }
        selectCharset(C) {
          return C.length !== 2 ? (this.selectDefaultCharset(), !0) : (C[0] === "/" || this._charsetService.setgCharset(p[C[0]], d.CHARSETS[C[1]] || d.DEFAULT_CHARSET), !0);
        }
        index() {
          return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), !0;
        }
        tabSet() {
          return this._activeBuffer.tabs[this._activeBuffer.x] = !0, !0;
        }
        reverseIndex() {
          if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
            const C = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
            this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, C, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
          } else
            this._activeBuffer.y--, this._restrictCursor();
          return !0;
        }
        fullReset() {
          return this._parser.reset(), this._onRequestReset.fire(), !0;
        }
        reset() {
          this._curAttrData = e.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = e.DEFAULT_ATTR_DATA.clone();
        }
        _eraseAttrData() {
          return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= 67108863 & this._curAttrData.bg, this._eraseAttrDataInternal;
        }
        setgLevel(C) {
          return this._charsetService.setgLevel(C), !0;
        }
        screenAlignmentPattern() {
          const C = new i.CellData();
          C.content = 4194304 | "E".charCodeAt(0), C.fg = this._curAttrData.fg, C.bg = this._curAttrData.bg, this._setCursor(0, 0);
          for (let R = 0; R < this._bufferService.rows; ++R) {
            const A = this._activeBuffer.ybase + this._activeBuffer.y + R, O = this._activeBuffer.lines.get(A);
            O && (O.fill(C), O.isWrapped = !1);
          }
          return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), !0;
        }
        requestStatusString(C, R) {
          const A = this._bufferService.buffer, O = this._optionsService.rawOptions;
          return ((z) => (this._coreService.triggerDataEvent(`${a.C0.ESC}${z}${a.C0.ESC}\\`), !0))(C === '"q' ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : C === '"p' ? 'P1$r61;1"p' : C === "r" ? `P1$r${A.scrollTop + 1};${A.scrollBottom + 1}r` : C === "m" ? "P1$r0m" : C === " q" ? `P1$r${{ block: 2, underline: 4, bar: 6 }[O.cursorStyle] - (O.cursorBlink ? 1 : 0)} q` : "P0$r");
        }
        markRangeDirty(C, R) {
          this._dirtyRowTracker.markRangeDirty(C, R);
        }
      }
      t.InputHandler = I;
      let F = class {
        constructor(N) {
          this._bufferService = N, this.clearRange();
        }
        clearRange() {
          this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
        }
        markDirty(N) {
          N < this.start ? this.start = N : N > this.end && (this.end = N);
        }
        markRangeDirty(N, C) {
          N > C && (T = N, N = C, C = T), N < this.start && (this.start = N), C > this.end && (this.end = C);
        }
        markAllDirty() {
          this.markRangeDirty(0, this._bufferService.rows - 1);
        }
      };
      function j(N) {
        return 0 <= N && N < 256;
      }
      F = o([_(0, h.IBufferService)], F);
    }, 844: (k, t) => {
      function n(o) {
        for (const _ of o)
          _.dispose();
        o.length = 0;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }), t.getDisposeArrayDisposable = t.disposeArray = t.toDisposable = t.MutableDisposable = t.Disposable = void 0, t.Disposable = class {
        constructor() {
          this._disposables = [], this._isDisposed = !1;
        }
        dispose() {
          this._isDisposed = !0;
          for (const o of this._disposables)
            o.dispose();
          this._disposables.length = 0;
        }
        register(o) {
          return this._disposables.push(o), o;
        }
        unregister(o) {
          const _ = this._disposables.indexOf(o);
          _ !== -1 && this._disposables.splice(_, 1);
        }
      }, t.MutableDisposable = class {
        constructor() {
          this._isDisposed = !1;
        }
        get value() {
          return this._isDisposed ? void 0 : this._value;
        }
        set value(o) {
          var _;
          this._isDisposed || o === this._value || ((_ = this._value) === null || _ === void 0 || _.dispose(), this._value = o);
        }
        clear() {
          this.value = void 0;
        }
        dispose() {
          var o;
          this._isDisposed = !0, (o = this._value) === null || o === void 0 || o.dispose(), this._value = void 0;
        }
      }, t.toDisposable = function(o) {
        return { dispose: o };
      }, t.disposeArray = n, t.getDisposeArrayDisposable = function(o) {
        return { dispose: () => n(o) };
      };
    }, 1505: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.FourKeyMap = t.TwoKeyMap = void 0;
      class n {
        constructor() {
          this._data = {};
        }
        set(_, a, d) {
          this._data[_] || (this._data[_] = {}), this._data[_][a] = d;
        }
        get(_, a) {
          return this._data[_] ? this._data[_][a] : void 0;
        }
        clear() {
          this._data = {};
        }
      }
      t.TwoKeyMap = n, t.FourKeyMap = class {
        constructor() {
          this._data = new n();
        }
        set(o, _, a, d, v) {
          this._data.get(o, _) || this._data.set(o, _, new n()), this._data.get(o, _).set(a, d, v);
        }
        get(o, _, a, d) {
          var v;
          return (v = this._data.get(o, _)) === null || v === void 0 ? void 0 : v.get(a, d);
        }
        clear() {
          this._data.clear();
        }
      };
    }, 6114: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.isChromeOS = t.isLinux = t.isWindows = t.isIphone = t.isIpad = t.isMac = t.getSafariVersion = t.isSafari = t.isLegacyEdge = t.isFirefox = t.isNode = void 0, t.isNode = typeof navigator > "u";
      const n = t.isNode ? "node" : navigator.userAgent, o = t.isNode ? "node" : navigator.platform;
      t.isFirefox = n.includes("Firefox"), t.isLegacyEdge = n.includes("Edge"), t.isSafari = /^((?!chrome|android).)*safari/i.test(n), t.getSafariVersion = function() {
        if (!t.isSafari)
          return 0;
        const _ = n.match(/Version\/(\d+)/);
        return _ === null || _.length < 2 ? 0 : parseInt(_[1]);
      }, t.isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(o), t.isIpad = o === "iPad", t.isIphone = o === "iPhone", t.isWindows = ["Windows", "Win16", "Win32", "WinCE"].includes(o), t.isLinux = o.indexOf("Linux") >= 0, t.isChromeOS = /\bCrOS\b/.test(n);
    }, 6106: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.SortedList = void 0;
      let n = 0;
      t.SortedList = class {
        constructor(o) {
          this._getKey = o, this._array = [];
        }
        clear() {
          this._array.length = 0;
        }
        insert(o) {
          this._array.length !== 0 ? (n = this._search(this._getKey(o)), this._array.splice(n, 0, o)) : this._array.push(o);
        }
        delete(o) {
          if (this._array.length === 0)
            return !1;
          const _ = this._getKey(o);
          if (_ === void 0 || (n = this._search(_), n === -1) || this._getKey(this._array[n]) !== _)
            return !1;
          do
            if (this._array[n] === o)
              return this._array.splice(n, 1), !0;
          while (++n < this._array.length && this._getKey(this._array[n]) === _);
          return !1;
        }
        *getKeyIterator(o) {
          if (this._array.length !== 0 && (n = this._search(o), !(n < 0 || n >= this._array.length) && this._getKey(this._array[n]) === o))
            do
              yield this._array[n];
            while (++n < this._array.length && this._getKey(this._array[n]) === o);
        }
        forEachByKey(o, _) {
          if (this._array.length !== 0 && (n = this._search(o), !(n < 0 || n >= this._array.length) && this._getKey(this._array[n]) === o))
            do
              _(this._array[n]);
            while (++n < this._array.length && this._getKey(this._array[n]) === o);
        }
        values() {
          return [...this._array].values();
        }
        _search(o) {
          let _ = 0, a = this._array.length - 1;
          for (; a >= _; ) {
            let d = _ + a >> 1;
            const v = this._getKey(this._array[d]);
            if (v > o)
              a = d - 1;
            else {
              if (!(v < o)) {
                for (; d > 0 && this._getKey(this._array[d - 1]) === o; )
                  d--;
                return d;
              }
              _ = d + 1;
            }
          }
          return _;
        }
      };
    }, 7226: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DebouncedIdleTask = t.IdleTaskQueue = t.PriorityTaskQueue = void 0;
      const o = n(6114);
      class _ {
        constructor() {
          this._tasks = [], this._i = 0;
        }
        enqueue(v) {
          this._tasks.push(v), this._start();
        }
        flush() {
          for (; this._i < this._tasks.length; )
            this._tasks[this._i]() || this._i++;
          this.clear();
        }
        clear() {
          this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
        }
        _start() {
          this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
        }
        _process(v) {
          this._idleCallback = void 0;
          let g = 0, u = 0, e = v.timeRemaining(), r = 0;
          for (; this._i < this._tasks.length; ) {
            if (g = Date.now(), this._tasks[this._i]() || this._i++, g = Math.max(1, Date.now() - g), u = Math.max(g, u), r = v.timeRemaining(), 1.5 * u > r)
              return e - g < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(e - g))}ms`), void this._start();
            e = r;
          }
          this.clear();
        }
      }
      class a extends _ {
        _requestCallback(v) {
          return setTimeout(() => v(this._createDeadline(16)));
        }
        _cancelCallback(v) {
          clearTimeout(v);
        }
        _createDeadline(v) {
          const g = Date.now() + v;
          return { timeRemaining: () => Math.max(0, g - Date.now()) };
        }
      }
      t.PriorityTaskQueue = a, t.IdleTaskQueue = !o.isNode && "requestIdleCallback" in window ? class extends _ {
        _requestCallback(d) {
          return requestIdleCallback(d);
        }
        _cancelCallback(d) {
          cancelIdleCallback(d);
        }
      } : a, t.DebouncedIdleTask = class {
        constructor() {
          this._queue = new t.IdleTaskQueue();
        }
        set(d) {
          this._queue.clear(), this._queue.enqueue(d);
        }
        flush() {
          this._queue.flush();
        }
      };
    }, 9282: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.updateWindowsModeWrappedState = void 0;
      const o = n(643);
      t.updateWindowsModeWrappedState = function(_) {
        const a = _.buffer.lines.get(_.buffer.ybase + _.buffer.y - 1), d = a == null ? void 0 : a.get(_.cols - 1), v = _.buffer.lines.get(_.buffer.ybase + _.buffer.y);
        v && d && (v.isWrapped = d[o.CHAR_DATA_CODE_INDEX] !== o.NULL_CELL_CODE && d[o.CHAR_DATA_CODE_INDEX] !== o.WHITESPACE_CELL_CODE);
      };
    }, 3734: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ExtendedAttrs = t.AttributeData = void 0;
      class n {
        constructor() {
          this.fg = 0, this.bg = 0, this.extended = new o();
        }
        static toColorRGB(a) {
          return [a >>> 16 & 255, a >>> 8 & 255, 255 & a];
        }
        static fromColorRGB(a) {
          return (255 & a[0]) << 16 | (255 & a[1]) << 8 | 255 & a[2];
        }
        clone() {
          const a = new n();
          return a.fg = this.fg, a.bg = this.bg, a.extended = this.extended.clone(), a;
        }
        isInverse() {
          return 67108864 & this.fg;
        }
        isBold() {
          return 134217728 & this.fg;
        }
        isUnderline() {
          return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : 268435456 & this.fg;
        }
        isBlink() {
          return 536870912 & this.fg;
        }
        isInvisible() {
          return 1073741824 & this.fg;
        }
        isItalic() {
          return 67108864 & this.bg;
        }
        isDim() {
          return 134217728 & this.bg;
        }
        isStrikethrough() {
          return 2147483648 & this.fg;
        }
        isProtected() {
          return 536870912 & this.bg;
        }
        isOverline() {
          return 1073741824 & this.bg;
        }
        getFgColorMode() {
          return 50331648 & this.fg;
        }
        getBgColorMode() {
          return 50331648 & this.bg;
        }
        isFgRGB() {
          return (50331648 & this.fg) == 50331648;
        }
        isBgRGB() {
          return (50331648 & this.bg) == 50331648;
        }
        isFgPalette() {
          return (50331648 & this.fg) == 16777216 || (50331648 & this.fg) == 33554432;
        }
        isBgPalette() {
          return (50331648 & this.bg) == 16777216 || (50331648 & this.bg) == 33554432;
        }
        isFgDefault() {
          return (50331648 & this.fg) == 0;
        }
        isBgDefault() {
          return (50331648 & this.bg) == 0;
        }
        isAttributeDefault() {
          return this.fg === 0 && this.bg === 0;
        }
        getFgColor() {
          switch (50331648 & this.fg) {
            case 16777216:
            case 33554432:
              return 255 & this.fg;
            case 50331648:
              return 16777215 & this.fg;
            default:
              return -1;
          }
        }
        getBgColor() {
          switch (50331648 & this.bg) {
            case 16777216:
            case 33554432:
              return 255 & this.bg;
            case 50331648:
              return 16777215 & this.bg;
            default:
              return -1;
          }
        }
        hasExtendedAttrs() {
          return 268435456 & this.bg;
        }
        updateExtended() {
          this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
        }
        getUnderlineColor() {
          if (268435456 & this.bg && ~this.extended.underlineColor)
            switch (50331648 & this.extended.underlineColor) {
              case 16777216:
              case 33554432:
                return 255 & this.extended.underlineColor;
              case 50331648:
                return 16777215 & this.extended.underlineColor;
              default:
                return this.getFgColor();
            }
          return this.getFgColor();
        }
        getUnderlineColorMode() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode();
        }
        isUnderlineColorRGB() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? (50331648 & this.extended.underlineColor) == 50331648 : this.isFgRGB();
        }
        isUnderlineColorPalette() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? (50331648 & this.extended.underlineColor) == 16777216 || (50331648 & this.extended.underlineColor) == 33554432 : this.isFgPalette();
        }
        isUnderlineColorDefault() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? (50331648 & this.extended.underlineColor) == 0 : this.isFgDefault();
        }
        getUnderlineStyle() {
          return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0;
        }
      }
      t.AttributeData = n;
      class o {
        get ext() {
          return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext;
        }
        set ext(a) {
          this._ext = a;
        }
        get underlineStyle() {
          return this._urlId ? 5 : (469762048 & this._ext) >> 26;
        }
        set underlineStyle(a) {
          this._ext &= -469762049, this._ext |= a << 26 & 469762048;
        }
        get underlineColor() {
          return 67108863 & this._ext;
        }
        set underlineColor(a) {
          this._ext &= -67108864, this._ext |= 67108863 & a;
        }
        get urlId() {
          return this._urlId;
        }
        set urlId(a) {
          this._urlId = a;
        }
        constructor(a = 0, d = 0) {
          this._ext = 0, this._urlId = 0, this._ext = a, this._urlId = d;
        }
        clone() {
          return new o(this._ext, this._urlId);
        }
        isEmpty() {
          return this.underlineStyle === 0 && this._urlId === 0;
        }
      }
      t.ExtendedAttrs = o;
    }, 9092: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.Buffer = t.MAX_BUFFER_SIZE = void 0;
      const o = n(6349), _ = n(7226), a = n(3734), d = n(8437), v = n(4634), g = n(511), u = n(643), e = n(4863), r = n(7116);
      t.MAX_BUFFER_SIZE = 4294967295, t.Buffer = class {
        constructor(s, i, l) {
          this._hasScrollback = s, this._optionsService = i, this._bufferService = l, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.tabs = {}, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = d.DEFAULT_ATTR_DATA.clone(), this.savedCharset = r.DEFAULT_CHARSET, this.markers = [], this._nullCell = g.CellData.fromCharData([0, u.NULL_CELL_CHAR, u.NULL_CELL_WIDTH, u.NULL_CELL_CODE]), this._whitespaceCell = g.CellData.fromCharData([0, u.WHITESPACE_CELL_CHAR, u.WHITESPACE_CELL_WIDTH, u.WHITESPACE_CELL_CODE]), this._isClearing = !1, this._memoryCleanupQueue = new _.IdleTaskQueue(), this._memoryCleanupPosition = 0, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new o.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
        }
        getNullCell(s) {
          return s ? (this._nullCell.fg = s.fg, this._nullCell.bg = s.bg, this._nullCell.extended = s.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new a.ExtendedAttrs()), this._nullCell;
        }
        getWhitespaceCell(s) {
          return s ? (this._whitespaceCell.fg = s.fg, this._whitespaceCell.bg = s.bg, this._whitespaceCell.extended = s.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new a.ExtendedAttrs()), this._whitespaceCell;
        }
        getBlankLine(s, i) {
          return new d.BufferLine(this._bufferService.cols, this.getNullCell(s), i);
        }
        get hasScrollback() {
          return this._hasScrollback && this.lines.maxLength > this._rows;
        }
        get isCursorInViewport() {
          const s = this.ybase + this.y - this.ydisp;
          return s >= 0 && s < this._rows;
        }
        _getCorrectBufferLength(s) {
          if (!this._hasScrollback)
            return s;
          const i = s + this._optionsService.rawOptions.scrollback;
          return i > t.MAX_BUFFER_SIZE ? t.MAX_BUFFER_SIZE : i;
        }
        fillViewportRows(s) {
          if (this.lines.length === 0) {
            s === void 0 && (s = d.DEFAULT_ATTR_DATA);
            let i = this._rows;
            for (; i--; )
              this.lines.push(this.getBlankLine(s));
          }
        }
        clear() {
          this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new o.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
        }
        resize(s, i) {
          const l = this.getNullCell(d.DEFAULT_ATTR_DATA);
          let h = 0;
          const f = this._getCorrectBufferLength(i);
          if (f > this.lines.maxLength && (this.lines.maxLength = f), this.lines.length > 0) {
            if (this._cols < s)
              for (let c = 0; c < this.lines.length; c++)
                h += +this.lines.get(c).resize(s, l);
            let b = 0;
            if (this._rows < i)
              for (let c = this._rows; c < i; c++)
                this.lines.length < i + this.ybase && (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== void 0 || this._optionsService.rawOptions.windowsPty.buildNumber !== void 0 ? this.lines.push(new d.BufferLine(s, l)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + b + 1 ? (this.ybase--, b++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new d.BufferLine(s, l)));
            else
              for (let c = this._rows; c > i; c--)
                this.lines.length > i + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
            if (f < this.lines.maxLength) {
              const c = this.lines.length - f;
              c > 0 && (this.lines.trimStart(c), this.ybase = Math.max(this.ybase - c, 0), this.ydisp = Math.max(this.ydisp - c, 0), this.savedY = Math.max(this.savedY - c, 0)), this.lines.maxLength = f;
            }
            this.x = Math.min(this.x, s - 1), this.y = Math.min(this.y, i - 1), b && (this.y += b), this.savedX = Math.min(this.savedX, s - 1), this.scrollTop = 0;
          }
          if (this.scrollBottom = i - 1, this._isReflowEnabled && (this._reflow(s, i), this._cols > s))
            for (let b = 0; b < this.lines.length; b++)
              h += +this.lines.get(b).resize(s, l);
          this._cols = s, this._rows = i, this._memoryCleanupQueue.clear(), h > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
        }
        _batchedMemoryCleanup() {
          let s = !0;
          this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, s = !1);
          let i = 0;
          for (; this._memoryCleanupPosition < this.lines.length; )
            if (i += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), i > 100)
              return !0;
          return s;
        }
        get _isReflowEnabled() {
          const s = this._optionsService.rawOptions.windowsPty;
          return s && s.buildNumber ? this._hasScrollback && s.backend === "conpty" && s.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
        }
        _reflow(s, i) {
          this._cols !== s && (s > this._cols ? this._reflowLarger(s, i) : this._reflowSmaller(s, i));
        }
        _reflowLarger(s, i) {
          const l = (0, v.reflowLargerGetLinesToRemove)(this.lines, this._cols, s, this.ybase + this.y, this.getNullCell(d.DEFAULT_ATTR_DATA));
          if (l.length > 0) {
            const h = (0, v.reflowLargerCreateNewLayout)(this.lines, l);
            (0, v.reflowLargerApplyNewLayout)(this.lines, h.layout), this._reflowLargerAdjustViewport(s, i, h.countRemoved);
          }
        }
        _reflowLargerAdjustViewport(s, i, l) {
          const h = this.getNullCell(d.DEFAULT_ATTR_DATA);
          let f = l;
          for (; f-- > 0; )
            this.ybase === 0 ? (this.y > 0 && this.y--, this.lines.length < i && this.lines.push(new d.BufferLine(s, h))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
          this.savedY = Math.max(this.savedY - l, 0);
        }
        _reflowSmaller(s, i) {
          const l = this.getNullCell(d.DEFAULT_ATTR_DATA), h = [];
          let f = 0;
          for (let b = this.lines.length - 1; b >= 0; b--) {
            let c = this.lines.get(b);
            if (!c || !c.isWrapped && c.getTrimmedLength() <= s)
              continue;
            const p = [c];
            for (; c.isWrapped && b > 0; )
              c = this.lines.get(--b), p.unshift(c);
            const L = this.ybase + this.y;
            if (L >= b && L < b + p.length)
              continue;
            const M = p[p.length - 1].getTrimmedLength(), D = (0, v.reflowSmallerGetNewLineLengths)(p, this._cols, s), T = D.length - p.length;
            let I;
            I = this.ybase === 0 && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + T) : Math.max(0, this.lines.length - this.lines.maxLength + T);
            const F = [];
            for (let O = 0; O < T; O++) {
              const z = this.getBlankLine(d.DEFAULT_ATTR_DATA, !0);
              F.push(z);
            }
            F.length > 0 && (h.push({ start: b + p.length + f, newLines: F }), f += F.length), p.push(...F);
            let j = D.length - 1, N = D[j];
            N === 0 && (j--, N = D[j]);
            let C = p.length - T - 1, R = M;
            for (; C >= 0; ) {
              const O = Math.min(R, N);
              if (p[j] === void 0)
                break;
              if (p[j].copyCellsFrom(p[C], R - O, N - O, O, !0), N -= O, N === 0 && (j--, N = D[j]), R -= O, R === 0) {
                C--;
                const z = Math.max(C, 0);
                R = (0, v.getWrappedLineTrimmedLength)(p, z, this._cols);
              }
            }
            for (let O = 0; O < p.length; O++)
              D[O] < s && p[O].setCell(D[O], l);
            let A = T - I;
            for (; A-- > 0; )
              this.ybase === 0 ? this.y < i - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + f) - i && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
            this.savedY = Math.min(this.savedY + T, this.ybase + i - 1);
          }
          if (h.length > 0) {
            const b = [], c = [];
            for (let j = 0; j < this.lines.length; j++)
              c.push(this.lines.get(j));
            const p = this.lines.length;
            let L = p - 1, M = 0, D = h[M];
            this.lines.length = Math.min(this.lines.maxLength, this.lines.length + f);
            let T = 0;
            for (let j = Math.min(this.lines.maxLength - 1, p + f - 1); j >= 0; j--)
              if (D && D.start > L + T) {
                for (let N = D.newLines.length - 1; N >= 0; N--)
                  this.lines.set(j--, D.newLines[N]);
                j++, b.push({ index: L + 1, amount: D.newLines.length }), T += D.newLines.length, D = h[++M];
              } else
                this.lines.set(j, c[L--]);
            let I = 0;
            for (let j = b.length - 1; j >= 0; j--)
              b[j].index += I, this.lines.onInsertEmitter.fire(b[j]), I += b[j].amount;
            const F = Math.max(0, p + f - this.lines.maxLength);
            F > 0 && this.lines.onTrimEmitter.fire(F);
          }
        }
        translateBufferLineToString(s, i, l = 0, h) {
          const f = this.lines.get(s);
          return f ? f.translateToString(i, l, h) : "";
        }
        getWrappedRangeForLine(s) {
          let i = s, l = s;
          for (; i > 0 && this.lines.get(i).isWrapped; )
            i--;
          for (; l + 1 < this.lines.length && this.lines.get(l + 1).isWrapped; )
            l++;
          return { first: i, last: l };
        }
        setupTabStops(s) {
          for (s != null ? this.tabs[s] || (s = this.prevStop(s)) : (this.tabs = {}, s = 0); s < this._cols; s += this._optionsService.rawOptions.tabStopWidth)
            this.tabs[s] = !0;
        }
        prevStop(s) {
          for (s == null && (s = this.x); !this.tabs[--s] && s > 0; )
            ;
          return s >= this._cols ? this._cols - 1 : s < 0 ? 0 : s;
        }
        nextStop(s) {
          for (s == null && (s = this.x); !this.tabs[++s] && s < this._cols; )
            ;
          return s >= this._cols ? this._cols - 1 : s < 0 ? 0 : s;
        }
        clearMarkers(s) {
          this._isClearing = !0;
          for (let i = 0; i < this.markers.length; i++)
            this.markers[i].line === s && (this.markers[i].dispose(), this.markers.splice(i--, 1));
          this._isClearing = !1;
        }
        clearAllMarkers() {
          this._isClearing = !0;
          for (let s = 0; s < this.markers.length; s++)
            this.markers[s].dispose(), this.markers.splice(s--, 1);
          this._isClearing = !1;
        }
        addMarker(s) {
          const i = new e.Marker(s);
          return this.markers.push(i), i.register(this.lines.onTrim((l) => {
            i.line -= l, i.line < 0 && i.dispose();
          })), i.register(this.lines.onInsert((l) => {
            i.line >= l.index && (i.line += l.amount);
          })), i.register(this.lines.onDelete((l) => {
            i.line >= l.index && i.line < l.index + l.amount && i.dispose(), i.line > l.index && (i.line -= l.amount);
          })), i.register(i.onDispose(() => this._removeMarker(i))), i;
        }
        _removeMarker(s) {
          this._isClearing || this.markers.splice(this.markers.indexOf(s), 1);
        }
      };
    }, 8437: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferLine = t.DEFAULT_ATTR_DATA = void 0;
      const o = n(3734), _ = n(511), a = n(643), d = n(482);
      t.DEFAULT_ATTR_DATA = Object.freeze(new o.AttributeData());
      let v = 0;
      class g {
        constructor(e, r, s = !1) {
          this.isWrapped = s, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(3 * e);
          const i = r || _.CellData.fromCharData([0, a.NULL_CELL_CHAR, a.NULL_CELL_WIDTH, a.NULL_CELL_CODE]);
          for (let l = 0; l < e; ++l)
            this.setCell(l, i);
          this.length = e;
        }
        get(e) {
          const r = this._data[3 * e + 0], s = 2097151 & r;
          return [this._data[3 * e + 1], 2097152 & r ? this._combined[e] : s ? (0, d.stringFromCodePoint)(s) : "", r >> 22, 2097152 & r ? this._combined[e].charCodeAt(this._combined[e].length - 1) : s];
        }
        set(e, r) {
          this._data[3 * e + 1] = r[a.CHAR_DATA_ATTR_INDEX], r[a.CHAR_DATA_CHAR_INDEX].length > 1 ? (this._combined[e] = r[1], this._data[3 * e + 0] = 2097152 | e | r[a.CHAR_DATA_WIDTH_INDEX] << 22) : this._data[3 * e + 0] = r[a.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | r[a.CHAR_DATA_WIDTH_INDEX] << 22;
        }
        getWidth(e) {
          return this._data[3 * e + 0] >> 22;
        }
        hasWidth(e) {
          return 12582912 & this._data[3 * e + 0];
        }
        getFg(e) {
          return this._data[3 * e + 1];
        }
        getBg(e) {
          return this._data[3 * e + 2];
        }
        hasContent(e) {
          return 4194303 & this._data[3 * e + 0];
        }
        getCodePoint(e) {
          const r = this._data[3 * e + 0];
          return 2097152 & r ? this._combined[e].charCodeAt(this._combined[e].length - 1) : 2097151 & r;
        }
        isCombined(e) {
          return 2097152 & this._data[3 * e + 0];
        }
        getString(e) {
          const r = this._data[3 * e + 0];
          return 2097152 & r ? this._combined[e] : 2097151 & r ? (0, d.stringFromCodePoint)(2097151 & r) : "";
        }
        isProtected(e) {
          return 536870912 & this._data[3 * e + 2];
        }
        loadCell(e, r) {
          return v = 3 * e, r.content = this._data[v + 0], r.fg = this._data[v + 1], r.bg = this._data[v + 2], 2097152 & r.content && (r.combinedData = this._combined[e]), 268435456 & r.bg && (r.extended = this._extendedAttrs[e]), r;
        }
        setCell(e, r) {
          2097152 & r.content && (this._combined[e] = r.combinedData), 268435456 & r.bg && (this._extendedAttrs[e] = r.extended), this._data[3 * e + 0] = r.content, this._data[3 * e + 1] = r.fg, this._data[3 * e + 2] = r.bg;
        }
        setCellFromCodePoint(e, r, s, i, l, h) {
          268435456 & l && (this._extendedAttrs[e] = h), this._data[3 * e + 0] = r | s << 22, this._data[3 * e + 1] = i, this._data[3 * e + 2] = l;
        }
        addCodepointToCell(e, r) {
          let s = this._data[3 * e + 0];
          2097152 & s ? this._combined[e] += (0, d.stringFromCodePoint)(r) : (2097151 & s ? (this._combined[e] = (0, d.stringFromCodePoint)(2097151 & s) + (0, d.stringFromCodePoint)(r), s &= -2097152, s |= 2097152) : s = r | 4194304, this._data[3 * e + 0] = s);
        }
        insertCells(e, r, s, i) {
          if ((e %= this.length) && this.getWidth(e - 1) === 2 && this.setCellFromCodePoint(e - 1, 0, 1, (i == null ? void 0 : i.fg) || 0, (i == null ? void 0 : i.bg) || 0, (i == null ? void 0 : i.extended) || new o.ExtendedAttrs()), r < this.length - e) {
            const l = new _.CellData();
            for (let h = this.length - e - r - 1; h >= 0; --h)
              this.setCell(e + r + h, this.loadCell(e + h, l));
            for (let h = 0; h < r; ++h)
              this.setCell(e + h, s);
          } else
            for (let l = e; l < this.length; ++l)
              this.setCell(l, s);
          this.getWidth(this.length - 1) === 2 && this.setCellFromCodePoint(this.length - 1, 0, 1, (i == null ? void 0 : i.fg) || 0, (i == null ? void 0 : i.bg) || 0, (i == null ? void 0 : i.extended) || new o.ExtendedAttrs());
        }
        deleteCells(e, r, s, i) {
          if (e %= this.length, r < this.length - e) {
            const l = new _.CellData();
            for (let h = 0; h < this.length - e - r; ++h)
              this.setCell(e + h, this.loadCell(e + r + h, l));
            for (let h = this.length - r; h < this.length; ++h)
              this.setCell(h, s);
          } else
            for (let l = e; l < this.length; ++l)
              this.setCell(l, s);
          e && this.getWidth(e - 1) === 2 && this.setCellFromCodePoint(e - 1, 0, 1, (i == null ? void 0 : i.fg) || 0, (i == null ? void 0 : i.bg) || 0, (i == null ? void 0 : i.extended) || new o.ExtendedAttrs()), this.getWidth(e) !== 0 || this.hasContent(e) || this.setCellFromCodePoint(e, 0, 1, (i == null ? void 0 : i.fg) || 0, (i == null ? void 0 : i.bg) || 0, (i == null ? void 0 : i.extended) || new o.ExtendedAttrs());
        }
        replaceCells(e, r, s, i, l = !1) {
          if (l)
            for (e && this.getWidth(e - 1) === 2 && !this.isProtected(e - 1) && this.setCellFromCodePoint(e - 1, 0, 1, (i == null ? void 0 : i.fg) || 0, (i == null ? void 0 : i.bg) || 0, (i == null ? void 0 : i.extended) || new o.ExtendedAttrs()), r < this.length && this.getWidth(r - 1) === 2 && !this.isProtected(r) && this.setCellFromCodePoint(r, 0, 1, (i == null ? void 0 : i.fg) || 0, (i == null ? void 0 : i.bg) || 0, (i == null ? void 0 : i.extended) || new o.ExtendedAttrs()); e < r && e < this.length; )
              this.isProtected(e) || this.setCell(e, s), e++;
          else
            for (e && this.getWidth(e - 1) === 2 && this.setCellFromCodePoint(e - 1, 0, 1, (i == null ? void 0 : i.fg) || 0, (i == null ? void 0 : i.bg) || 0, (i == null ? void 0 : i.extended) || new o.ExtendedAttrs()), r < this.length && this.getWidth(r - 1) === 2 && this.setCellFromCodePoint(r, 0, 1, (i == null ? void 0 : i.fg) || 0, (i == null ? void 0 : i.bg) || 0, (i == null ? void 0 : i.extended) || new o.ExtendedAttrs()); e < r && e < this.length; )
              this.setCell(e++, s);
        }
        resize(e, r) {
          if (e === this.length)
            return 4 * this._data.length * 2 < this._data.buffer.byteLength;
          const s = 3 * e;
          if (e > this.length) {
            if (this._data.buffer.byteLength >= 4 * s)
              this._data = new Uint32Array(this._data.buffer, 0, s);
            else {
              const i = new Uint32Array(s);
              i.set(this._data), this._data = i;
            }
            for (let i = this.length; i < e; ++i)
              this.setCell(i, r);
          } else {
            this._data = this._data.subarray(0, s);
            const i = Object.keys(this._combined);
            for (let h = 0; h < i.length; h++) {
              const f = parseInt(i[h], 10);
              f >= e && delete this._combined[f];
            }
            const l = Object.keys(this._extendedAttrs);
            for (let h = 0; h < l.length; h++) {
              const f = parseInt(l[h], 10);
              f >= e && delete this._extendedAttrs[f];
            }
          }
          return this.length = e, 4 * s * 2 < this._data.buffer.byteLength;
        }
        cleanupMemory() {
          if (4 * this._data.length * 2 < this._data.buffer.byteLength) {
            const e = new Uint32Array(this._data.length);
            return e.set(this._data), this._data = e, 1;
          }
          return 0;
        }
        fill(e, r = !1) {
          if (r)
            for (let s = 0; s < this.length; ++s)
              this.isProtected(s) || this.setCell(s, e);
          else {
            this._combined = {}, this._extendedAttrs = {};
            for (let s = 0; s < this.length; ++s)
              this.setCell(s, e);
          }
        }
        copyFrom(e) {
          this.length !== e.length ? this._data = new Uint32Array(e._data) : this._data.set(e._data), this.length = e.length, this._combined = {};
          for (const r in e._combined)
            this._combined[r] = e._combined[r];
          this._extendedAttrs = {};
          for (const r in e._extendedAttrs)
            this._extendedAttrs[r] = e._extendedAttrs[r];
          this.isWrapped = e.isWrapped;
        }
        clone() {
          const e = new g(0);
          e._data = new Uint32Array(this._data), e.length = this.length;
          for (const r in this._combined)
            e._combined[r] = this._combined[r];
          for (const r in this._extendedAttrs)
            e._extendedAttrs[r] = this._extendedAttrs[r];
          return e.isWrapped = this.isWrapped, e;
        }
        getTrimmedLength() {
          for (let e = this.length - 1; e >= 0; --e)
            if (4194303 & this._data[3 * e + 0])
              return e + (this._data[3 * e + 0] >> 22);
          return 0;
        }
        getNoBgTrimmedLength() {
          for (let e = this.length - 1; e >= 0; --e)
            if (4194303 & this._data[3 * e + 0] || 50331648 & this._data[3 * e + 2])
              return e + (this._data[3 * e + 0] >> 22);
          return 0;
        }
        copyCellsFrom(e, r, s, i, l) {
          const h = e._data;
          if (l)
            for (let b = i - 1; b >= 0; b--) {
              for (let c = 0; c < 3; c++)
                this._data[3 * (s + b) + c] = h[3 * (r + b) + c];
              268435456 & h[3 * (r + b) + 2] && (this._extendedAttrs[s + b] = e._extendedAttrs[r + b]);
            }
          else
            for (let b = 0; b < i; b++) {
              for (let c = 0; c < 3; c++)
                this._data[3 * (s + b) + c] = h[3 * (r + b) + c];
              268435456 & h[3 * (r + b) + 2] && (this._extendedAttrs[s + b] = e._extendedAttrs[r + b]);
            }
          const f = Object.keys(e._combined);
          for (let b = 0; b < f.length; b++) {
            const c = parseInt(f[b], 10);
            c >= r && (this._combined[c - r + s] = e._combined[c]);
          }
        }
        translateToString(e = !1, r = 0, s = this.length) {
          e && (s = Math.min(s, this.getTrimmedLength()));
          let i = "";
          for (; r < s; ) {
            const l = this._data[3 * r + 0], h = 2097151 & l;
            i += 2097152 & l ? this._combined[r] : h ? (0, d.stringFromCodePoint)(h) : a.WHITESPACE_CELL_CHAR, r += l >> 22 || 1;
          }
          return i;
        }
      }
      t.BufferLine = g;
    }, 4841: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.getRangeLength = void 0, t.getRangeLength = function(n, o) {
        if (n.start.y > n.end.y)
          throw new Error(`Buffer range end (${n.end.x}, ${n.end.y}) cannot be before start (${n.start.x}, ${n.start.y})`);
        return o * (n.end.y - n.start.y) + (n.end.x - n.start.x + 1);
      };
    }, 4634: (k, t) => {
      function n(o, _, a) {
        if (_ === o.length - 1)
          return o[_].getTrimmedLength();
        const d = !o[_].hasContent(a - 1) && o[_].getWidth(a - 1) === 1, v = o[_ + 1].getWidth(0) === 2;
        return d && v ? a - 1 : a;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }), t.getWrappedLineTrimmedLength = t.reflowSmallerGetNewLineLengths = t.reflowLargerApplyNewLayout = t.reflowLargerCreateNewLayout = t.reflowLargerGetLinesToRemove = void 0, t.reflowLargerGetLinesToRemove = function(o, _, a, d, v) {
        const g = [];
        for (let u = 0; u < o.length - 1; u++) {
          let e = u, r = o.get(++e);
          if (!r.isWrapped)
            continue;
          const s = [o.get(u)];
          for (; e < o.length && r.isWrapped; )
            s.push(r), r = o.get(++e);
          if (d >= u && d < e) {
            u += s.length - 1;
            continue;
          }
          let i = 0, l = n(s, i, _), h = 1, f = 0;
          for (; h < s.length; ) {
            const c = n(s, h, _), p = c - f, L = a - l, M = Math.min(p, L);
            s[i].copyCellsFrom(s[h], f, l, M, !1), l += M, l === a && (i++, l = 0), f += M, f === c && (h++, f = 0), l === 0 && i !== 0 && s[i - 1].getWidth(a - 1) === 2 && (s[i].copyCellsFrom(s[i - 1], a - 1, l++, 1, !1), s[i - 1].setCell(a - 1, v));
          }
          s[i].replaceCells(l, a, v);
          let b = 0;
          for (let c = s.length - 1; c > 0 && (c > i || s[c].getTrimmedLength() === 0); c--)
            b++;
          b > 0 && (g.push(u + s.length - b), g.push(b)), u += s.length - 1;
        }
        return g;
      }, t.reflowLargerCreateNewLayout = function(o, _) {
        const a = [];
        let d = 0, v = _[d], g = 0;
        for (let u = 0; u < o.length; u++)
          if (v === u) {
            const e = _[++d];
            o.onDeleteEmitter.fire({ index: u - g, amount: e }), u += e - 1, g += e, v = _[++d];
          } else
            a.push(u);
        return { layout: a, countRemoved: g };
      }, t.reflowLargerApplyNewLayout = function(o, _) {
        const a = [];
        for (let d = 0; d < _.length; d++)
          a.push(o.get(_[d]));
        for (let d = 0; d < a.length; d++)
          o.set(d, a[d]);
        o.length = _.length;
      }, t.reflowSmallerGetNewLineLengths = function(o, _, a) {
        const d = [], v = o.map((r, s) => n(o, s, _)).reduce((r, s) => r + s);
        let g = 0, u = 0, e = 0;
        for (; e < v; ) {
          if (v - e < a) {
            d.push(v - e);
            break;
          }
          g += a;
          const r = n(o, u, _);
          g > r && (g -= r, u++);
          const s = o[u].getWidth(g - 1) === 2;
          s && g--;
          const i = s ? a - 1 : a;
          d.push(i), e += i;
        }
        return d;
      }, t.getWrappedLineTrimmedLength = n;
    }, 5295: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferSet = void 0;
      const o = n(8460), _ = n(844), a = n(9092);
      class d extends _.Disposable {
        constructor(g, u) {
          super(), this._optionsService = g, this._bufferService = u, this._onBufferActivate = this.register(new o.EventEmitter()), this.onBufferActivate = this._onBufferActivate.event, this.reset(), this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this.register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
        }
        reset() {
          this._normal = new a.Buffer(!0, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new a.Buffer(!1, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
        }
        get alt() {
          return this._alt;
        }
        get active() {
          return this._activeBuffer;
        }
        get normal() {
          return this._normal;
        }
        activateNormalBuffer() {
          this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
        }
        activateAltBuffer(g) {
          this._activeBuffer !== this._alt && (this._alt.fillViewportRows(g), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
        }
        resize(g, u) {
          this._normal.resize(g, u), this._alt.resize(g, u), this.setupTabStops(g);
        }
        setupTabStops(g) {
          this._normal.setupTabStops(g), this._alt.setupTabStops(g);
        }
      }
      t.BufferSet = d;
    }, 511: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CellData = void 0;
      const o = n(482), _ = n(643), a = n(3734);
      class d extends a.AttributeData {
        constructor() {
          super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new a.ExtendedAttrs(), this.combinedData = "";
        }
        static fromCharData(g) {
          const u = new d();
          return u.setFromCharData(g), u;
        }
        isCombined() {
          return 2097152 & this.content;
        }
        getWidth() {
          return this.content >> 22;
        }
        getChars() {
          return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0, o.stringFromCodePoint)(2097151 & this.content) : "";
        }
        getCode() {
          return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content;
        }
        setFromCharData(g) {
          this.fg = g[_.CHAR_DATA_ATTR_INDEX], this.bg = 0;
          let u = !1;
          if (g[_.CHAR_DATA_CHAR_INDEX].length > 2)
            u = !0;
          else if (g[_.CHAR_DATA_CHAR_INDEX].length === 2) {
            const e = g[_.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
            if (55296 <= e && e <= 56319) {
              const r = g[_.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
              56320 <= r && r <= 57343 ? this.content = 1024 * (e - 55296) + r - 56320 + 65536 | g[_.CHAR_DATA_WIDTH_INDEX] << 22 : u = !0;
            } else
              u = !0;
          } else
            this.content = g[_.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | g[_.CHAR_DATA_WIDTH_INDEX] << 22;
          u && (this.combinedData = g[_.CHAR_DATA_CHAR_INDEX], this.content = 2097152 | g[_.CHAR_DATA_WIDTH_INDEX] << 22);
        }
        getAsCharData() {
          return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
        }
      }
      t.CellData = d;
    }, 643: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.WHITESPACE_CELL_CODE = t.WHITESPACE_CELL_WIDTH = t.WHITESPACE_CELL_CHAR = t.NULL_CELL_CODE = t.NULL_CELL_WIDTH = t.NULL_CELL_CHAR = t.CHAR_DATA_CODE_INDEX = t.CHAR_DATA_WIDTH_INDEX = t.CHAR_DATA_CHAR_INDEX = t.CHAR_DATA_ATTR_INDEX = t.DEFAULT_EXT = t.DEFAULT_ATTR = t.DEFAULT_COLOR = void 0, t.DEFAULT_COLOR = 0, t.DEFAULT_ATTR = 256 | t.DEFAULT_COLOR << 9, t.DEFAULT_EXT = 0, t.CHAR_DATA_ATTR_INDEX = 0, t.CHAR_DATA_CHAR_INDEX = 1, t.CHAR_DATA_WIDTH_INDEX = 2, t.CHAR_DATA_CODE_INDEX = 3, t.NULL_CELL_CHAR = "", t.NULL_CELL_WIDTH = 1, t.NULL_CELL_CODE = 0, t.WHITESPACE_CELL_CHAR = " ", t.WHITESPACE_CELL_WIDTH = 1, t.WHITESPACE_CELL_CODE = 32;
    }, 4863: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.Marker = void 0;
      const o = n(8460), _ = n(844);
      class a {
        get id() {
          return this._id;
        }
        constructor(v) {
          this.line = v, this.isDisposed = !1, this._disposables = [], this._id = a._nextId++, this._onDispose = this.register(new o.EventEmitter()), this.onDispose = this._onDispose.event;
        }
        dispose() {
          this.isDisposed || (this.isDisposed = !0, this.line = -1, this._onDispose.fire(), (0, _.disposeArray)(this._disposables), this._disposables.length = 0);
        }
        register(v) {
          return this._disposables.push(v), v;
        }
      }
      t.Marker = a, a._nextId = 1;
    }, 7116: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DEFAULT_CHARSET = t.CHARSETS = void 0, t.CHARSETS = {}, t.DEFAULT_CHARSET = t.CHARSETS.B, t.CHARSETS[0] = { "`": "◆", a: "▒", b: "␉", c: "␌", d: "␍", e: "␊", f: "°", g: "±", h: "␤", i: "␋", j: "┘", k: "┐", l: "┌", m: "└", n: "┼", o: "⎺", p: "⎻", q: "─", r: "⎼", s: "⎽", t: "├", u: "┤", v: "┴", w: "┬", x: "│", y: "≤", z: "≥", "{": "π", "|": "≠", "}": "£", "~": "·" }, t.CHARSETS.A = { "#": "£" }, t.CHARSETS.B = void 0, t.CHARSETS[4] = { "#": "£", "@": "¾", "[": "ij", "\\": "½", "]": "|", "{": "¨", "|": "f", "}": "¼", "~": "´" }, t.CHARSETS.C = t.CHARSETS[5] = { "[": "Ä", "\\": "Ö", "]": "Å", "^": "Ü", "`": "é", "{": "ä", "|": "ö", "}": "å", "~": "ü" }, t.CHARSETS.R = { "#": "£", "@": "à", "[": "°", "\\": "ç", "]": "§", "{": "é", "|": "ù", "}": "è", "~": "¨" }, t.CHARSETS.Q = { "@": "à", "[": "â", "\\": "ç", "]": "ê", "^": "î", "`": "ô", "{": "é", "|": "ù", "}": "è", "~": "û" }, t.CHARSETS.K = { "@": "§", "[": "Ä", "\\": "Ö", "]": "Ü", "{": "ä", "|": "ö", "}": "ü", "~": "ß" }, t.CHARSETS.Y = { "#": "£", "@": "§", "[": "°", "\\": "ç", "]": "é", "`": "ù", "{": "à", "|": "ò", "}": "è", "~": "ì" }, t.CHARSETS.E = t.CHARSETS[6] = { "@": "Ä", "[": "Æ", "\\": "Ø", "]": "Å", "^": "Ü", "`": "ä", "{": "æ", "|": "ø", "}": "å", "~": "ü" }, t.CHARSETS.Z = { "#": "£", "@": "§", "[": "¡", "\\": "Ñ", "]": "¿", "{": "°", "|": "ñ", "}": "ç" }, t.CHARSETS.H = t.CHARSETS[7] = { "@": "É", "[": "Ä", "\\": "Ö", "]": "Å", "^": "Ü", "`": "é", "{": "ä", "|": "ö", "}": "å", "~": "ü" }, t.CHARSETS["="] = { "#": "ù", "@": "à", "[": "é", "\\": "ç", "]": "ê", "^": "î", _: "è", "`": "ô", "{": "ä", "|": "ö", "}": "ü", "~": "û" };
    }, 2584: (k, t) => {
      var n, o, _;
      Object.defineProperty(t, "__esModule", { value: !0 }), t.C1_ESCAPED = t.C1 = t.C0 = void 0, function(a) {
        a.NUL = "\0", a.SOH = "", a.STX = "", a.ETX = "", a.EOT = "", a.ENQ = "", a.ACK = "", a.BEL = "\x07", a.BS = "\b", a.HT = "	", a.LF = `
`, a.VT = "\v", a.FF = "\f", a.CR = "\r", a.SO = "", a.SI = "", a.DLE = "", a.DC1 = "", a.DC2 = "", a.DC3 = "", a.DC4 = "", a.NAK = "", a.SYN = "", a.ETB = "", a.CAN = "", a.EM = "", a.SUB = "", a.ESC = "\x1B", a.FS = "", a.GS = "", a.RS = "", a.US = "", a.SP = " ", a.DEL = "";
      }(n || (t.C0 = n = {})), function(a) {
        a.PAD = "", a.HOP = "", a.BPH = "", a.NBH = "", a.IND = "", a.NEL = "", a.SSA = "", a.ESA = "", a.HTS = "", a.HTJ = "", a.VTS = "", a.PLD = "", a.PLU = "", a.RI = "", a.SS2 = "", a.SS3 = "", a.DCS = "", a.PU1 = "", a.PU2 = "", a.STS = "", a.CCH = "", a.MW = "", a.SPA = "", a.EPA = "", a.SOS = "", a.SGCI = "", a.SCI = "", a.CSI = "", a.ST = "", a.OSC = "", a.PM = "", a.APC = "";
      }(o || (t.C1 = o = {})), function(a) {
        a.ST = `${n.ESC}\\`;
      }(_ || (t.C1_ESCAPED = _ = {}));
    }, 7399: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.evaluateKeyboardEvent = void 0;
      const o = n(2584), _ = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
      t.evaluateKeyboardEvent = function(a, d, v, g) {
        const u = { type: 0, cancel: !1, key: void 0 }, e = (a.shiftKey ? 1 : 0) | (a.altKey ? 2 : 0) | (a.ctrlKey ? 4 : 0) | (a.metaKey ? 8 : 0);
        switch (a.keyCode) {
          case 0:
            a.key === "UIKeyInputUpArrow" ? u.key = d ? o.C0.ESC + "OA" : o.C0.ESC + "[A" : a.key === "UIKeyInputLeftArrow" ? u.key = d ? o.C0.ESC + "OD" : o.C0.ESC + "[D" : a.key === "UIKeyInputRightArrow" ? u.key = d ? o.C0.ESC + "OC" : o.C0.ESC + "[C" : a.key === "UIKeyInputDownArrow" && (u.key = d ? o.C0.ESC + "OB" : o.C0.ESC + "[B");
            break;
          case 8:
            if (a.altKey) {
              u.key = o.C0.ESC + o.C0.DEL;
              break;
            }
            u.key = o.C0.DEL;
            break;
          case 9:
            if (a.shiftKey) {
              u.key = o.C0.ESC + "[Z";
              break;
            }
            u.key = o.C0.HT, u.cancel = !0;
            break;
          case 13:
            u.key = a.altKey ? o.C0.ESC + o.C0.CR : o.C0.CR, u.cancel = !0;
            break;
          case 27:
            u.key = o.C0.ESC, a.altKey && (u.key = o.C0.ESC + o.C0.ESC), u.cancel = !0;
            break;
          case 37:
            if (a.metaKey)
              break;
            e ? (u.key = o.C0.ESC + "[1;" + (e + 1) + "D", u.key === o.C0.ESC + "[1;3D" && (u.key = o.C0.ESC + (v ? "b" : "[1;5D"))) : u.key = d ? o.C0.ESC + "OD" : o.C0.ESC + "[D";
            break;
          case 39:
            if (a.metaKey)
              break;
            e ? (u.key = o.C0.ESC + "[1;" + (e + 1) + "C", u.key === o.C0.ESC + "[1;3C" && (u.key = o.C0.ESC + (v ? "f" : "[1;5C"))) : u.key = d ? o.C0.ESC + "OC" : o.C0.ESC + "[C";
            break;
          case 38:
            if (a.metaKey)
              break;
            e ? (u.key = o.C0.ESC + "[1;" + (e + 1) + "A", v || u.key !== o.C0.ESC + "[1;3A" || (u.key = o.C0.ESC + "[1;5A")) : u.key = d ? o.C0.ESC + "OA" : o.C0.ESC + "[A";
            break;
          case 40:
            if (a.metaKey)
              break;
            e ? (u.key = o.C0.ESC + "[1;" + (e + 1) + "B", v || u.key !== o.C0.ESC + "[1;3B" || (u.key = o.C0.ESC + "[1;5B")) : u.key = d ? o.C0.ESC + "OB" : o.C0.ESC + "[B";
            break;
          case 45:
            a.shiftKey || a.ctrlKey || (u.key = o.C0.ESC + "[2~");
            break;
          case 46:
            u.key = e ? o.C0.ESC + "[3;" + (e + 1) + "~" : o.C0.ESC + "[3~";
            break;
          case 36:
            u.key = e ? o.C0.ESC + "[1;" + (e + 1) + "H" : d ? o.C0.ESC + "OH" : o.C0.ESC + "[H";
            break;
          case 35:
            u.key = e ? o.C0.ESC + "[1;" + (e + 1) + "F" : d ? o.C0.ESC + "OF" : o.C0.ESC + "[F";
            break;
          case 33:
            a.shiftKey ? u.type = 2 : a.ctrlKey ? u.key = o.C0.ESC + "[5;" + (e + 1) + "~" : u.key = o.C0.ESC + "[5~";
            break;
          case 34:
            a.shiftKey ? u.type = 3 : a.ctrlKey ? u.key = o.C0.ESC + "[6;" + (e + 1) + "~" : u.key = o.C0.ESC + "[6~";
            break;
          case 112:
            u.key = e ? o.C0.ESC + "[1;" + (e + 1) + "P" : o.C0.ESC + "OP";
            break;
          case 113:
            u.key = e ? o.C0.ESC + "[1;" + (e + 1) + "Q" : o.C0.ESC + "OQ";
            break;
          case 114:
            u.key = e ? o.C0.ESC + "[1;" + (e + 1) + "R" : o.C0.ESC + "OR";
            break;
          case 115:
            u.key = e ? o.C0.ESC + "[1;" + (e + 1) + "S" : o.C0.ESC + "OS";
            break;
          case 116:
            u.key = e ? o.C0.ESC + "[15;" + (e + 1) + "~" : o.C0.ESC + "[15~";
            break;
          case 117:
            u.key = e ? o.C0.ESC + "[17;" + (e + 1) + "~" : o.C0.ESC + "[17~";
            break;
          case 118:
            u.key = e ? o.C0.ESC + "[18;" + (e + 1) + "~" : o.C0.ESC + "[18~";
            break;
          case 119:
            u.key = e ? o.C0.ESC + "[19;" + (e + 1) + "~" : o.C0.ESC + "[19~";
            break;
          case 120:
            u.key = e ? o.C0.ESC + "[20;" + (e + 1) + "~" : o.C0.ESC + "[20~";
            break;
          case 121:
            u.key = e ? o.C0.ESC + "[21;" + (e + 1) + "~" : o.C0.ESC + "[21~";
            break;
          case 122:
            u.key = e ? o.C0.ESC + "[23;" + (e + 1) + "~" : o.C0.ESC + "[23~";
            break;
          case 123:
            u.key = e ? o.C0.ESC + "[24;" + (e + 1) + "~" : o.C0.ESC + "[24~";
            break;
          default:
            if (!a.ctrlKey || a.shiftKey || a.altKey || a.metaKey)
              if (v && !g || !a.altKey || a.metaKey)
                !v || a.altKey || a.ctrlKey || a.shiftKey || !a.metaKey ? a.key && !a.ctrlKey && !a.altKey && !a.metaKey && a.keyCode >= 48 && a.key.length === 1 ? u.key = a.key : a.key && a.ctrlKey && (a.key === "_" && (u.key = o.C0.US), a.key === "@" && (u.key = o.C0.NUL)) : a.keyCode === 65 && (u.type = 1);
              else {
                const r = _[a.keyCode], s = r == null ? void 0 : r[a.shiftKey ? 1 : 0];
                if (s)
                  u.key = o.C0.ESC + s;
                else if (a.keyCode >= 65 && a.keyCode <= 90) {
                  const i = a.ctrlKey ? a.keyCode - 64 : a.keyCode + 32;
                  let l = String.fromCharCode(i);
                  a.shiftKey && (l = l.toUpperCase()), u.key = o.C0.ESC + l;
                } else if (a.keyCode === 32)
                  u.key = o.C0.ESC + (a.ctrlKey ? o.C0.NUL : " ");
                else if (a.key === "Dead" && a.code.startsWith("Key")) {
                  let i = a.code.slice(3, 4);
                  a.shiftKey || (i = i.toLowerCase()), u.key = o.C0.ESC + i, u.cancel = !0;
                }
              }
            else
              a.keyCode >= 65 && a.keyCode <= 90 ? u.key = String.fromCharCode(a.keyCode - 64) : a.keyCode === 32 ? u.key = o.C0.NUL : a.keyCode >= 51 && a.keyCode <= 55 ? u.key = String.fromCharCode(a.keyCode - 51 + 27) : a.keyCode === 56 ? u.key = o.C0.DEL : a.keyCode === 219 ? u.key = o.C0.ESC : a.keyCode === 220 ? u.key = o.C0.FS : a.keyCode === 221 && (u.key = o.C0.GS);
        }
        return u;
      };
    }, 482: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.Utf8ToUtf32 = t.StringToUtf32 = t.utf32ToString = t.stringFromCodePoint = void 0, t.stringFromCodePoint = function(n) {
        return n > 65535 ? (n -= 65536, String.fromCharCode(55296 + (n >> 10)) + String.fromCharCode(n % 1024 + 56320)) : String.fromCharCode(n);
      }, t.utf32ToString = function(n, o = 0, _ = n.length) {
        let a = "";
        for (let d = o; d < _; ++d) {
          let v = n[d];
          v > 65535 ? (v -= 65536, a += String.fromCharCode(55296 + (v >> 10)) + String.fromCharCode(v % 1024 + 56320)) : a += String.fromCharCode(v);
        }
        return a;
      }, t.StringToUtf32 = class {
        constructor() {
          this._interim = 0;
        }
        clear() {
          this._interim = 0;
        }
        decode(n, o) {
          const _ = n.length;
          if (!_)
            return 0;
          let a = 0, d = 0;
          if (this._interim) {
            const v = n.charCodeAt(d++);
            56320 <= v && v <= 57343 ? o[a++] = 1024 * (this._interim - 55296) + v - 56320 + 65536 : (o[a++] = this._interim, o[a++] = v), this._interim = 0;
          }
          for (let v = d; v < _; ++v) {
            const g = n.charCodeAt(v);
            if (55296 <= g && g <= 56319) {
              if (++v >= _)
                return this._interim = g, a;
              const u = n.charCodeAt(v);
              56320 <= u && u <= 57343 ? o[a++] = 1024 * (g - 55296) + u - 56320 + 65536 : (o[a++] = g, o[a++] = u);
            } else
              g !== 65279 && (o[a++] = g);
          }
          return a;
        }
      }, t.Utf8ToUtf32 = class {
        constructor() {
          this.interim = new Uint8Array(3);
        }
        clear() {
          this.interim.fill(0);
        }
        decode(n, o) {
          const _ = n.length;
          if (!_)
            return 0;
          let a, d, v, g, u = 0, e = 0, r = 0;
          if (this.interim[0]) {
            let l = !1, h = this.interim[0];
            h &= (224 & h) == 192 ? 31 : (240 & h) == 224 ? 15 : 7;
            let f, b = 0;
            for (; (f = 63 & this.interim[++b]) && b < 4; )
              h <<= 6, h |= f;
            const c = (224 & this.interim[0]) == 192 ? 2 : (240 & this.interim[0]) == 224 ? 3 : 4, p = c - b;
            for (; r < p; ) {
              if (r >= _)
                return 0;
              if (f = n[r++], (192 & f) != 128) {
                r--, l = !0;
                break;
              }
              this.interim[b++] = f, h <<= 6, h |= 63 & f;
            }
            l || (c === 2 ? h < 128 ? r-- : o[u++] = h : c === 3 ? h < 2048 || h >= 55296 && h <= 57343 || h === 65279 || (o[u++] = h) : h < 65536 || h > 1114111 || (o[u++] = h)), this.interim.fill(0);
          }
          const s = _ - 4;
          let i = r;
          for (; i < _; ) {
            for (; !(!(i < s) || 128 & (a = n[i]) || 128 & (d = n[i + 1]) || 128 & (v = n[i + 2]) || 128 & (g = n[i + 3])); )
              o[u++] = a, o[u++] = d, o[u++] = v, o[u++] = g, i += 4;
            if (a = n[i++], a < 128)
              o[u++] = a;
            else if ((224 & a) == 192) {
              if (i >= _)
                return this.interim[0] = a, u;
              if (d = n[i++], (192 & d) != 128) {
                i--;
                continue;
              }
              if (e = (31 & a) << 6 | 63 & d, e < 128) {
                i--;
                continue;
              }
              o[u++] = e;
            } else if ((240 & a) == 224) {
              if (i >= _)
                return this.interim[0] = a, u;
              if (d = n[i++], (192 & d) != 128) {
                i--;
                continue;
              }
              if (i >= _)
                return this.interim[0] = a, this.interim[1] = d, u;
              if (v = n[i++], (192 & v) != 128) {
                i--;
                continue;
              }
              if (e = (15 & a) << 12 | (63 & d) << 6 | 63 & v, e < 2048 || e >= 55296 && e <= 57343 || e === 65279)
                continue;
              o[u++] = e;
            } else if ((248 & a) == 240) {
              if (i >= _)
                return this.interim[0] = a, u;
              if (d = n[i++], (192 & d) != 128) {
                i--;
                continue;
              }
              if (i >= _)
                return this.interim[0] = a, this.interim[1] = d, u;
              if (v = n[i++], (192 & v) != 128) {
                i--;
                continue;
              }
              if (i >= _)
                return this.interim[0] = a, this.interim[1] = d, this.interim[2] = v, u;
              if (g = n[i++], (192 & g) != 128) {
                i--;
                continue;
              }
              if (e = (7 & a) << 18 | (63 & d) << 12 | (63 & v) << 6 | 63 & g, e < 65536 || e > 1114111)
                continue;
              o[u++] = e;
            }
          }
          return u;
        }
      };
    }, 225: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.UnicodeV6 = void 0;
      const n = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]], o = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
      let _;
      t.UnicodeV6 = class {
        constructor() {
          if (this.version = "6", !_) {
            _ = new Uint8Array(65536), _.fill(1), _[0] = 0, _.fill(0, 1, 32), _.fill(0, 127, 160), _.fill(2, 4352, 4448), _[9001] = 2, _[9002] = 2, _.fill(2, 11904, 42192), _[12351] = 1, _.fill(2, 44032, 55204), _.fill(2, 63744, 64256), _.fill(2, 65040, 65050), _.fill(2, 65072, 65136), _.fill(2, 65280, 65377), _.fill(2, 65504, 65511);
            for (let a = 0; a < n.length; ++a)
              _.fill(0, n[a][0], n[a][1] + 1);
          }
        }
        wcwidth(a) {
          return a < 32 ? 0 : a < 127 ? 1 : a < 65536 ? _[a] : function(d, v) {
            let g, u = 0, e = v.length - 1;
            if (d < v[0][0] || d > v[e][1])
              return !1;
            for (; e >= u; )
              if (g = u + e >> 1, d > v[g][1])
                u = g + 1;
              else {
                if (!(d < v[g][0]))
                  return !0;
                e = g - 1;
              }
            return !1;
          }(a, o) ? 0 : a >= 131072 && a <= 196605 || a >= 196608 && a <= 262141 ? 2 : 1;
        }
      };
    }, 5981: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.WriteBuffer = void 0;
      const o = n(8460), _ = n(844);
      class a extends _.Disposable {
        constructor(v) {
          super(), this._action = v, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = !1, this._syncCalls = 0, this._didUserInput = !1, this._onWriteParsed = this.register(new o.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event;
        }
        handleUserInput() {
          this._didUserInput = !0;
        }
        writeSync(v, g) {
          if (g !== void 0 && this._syncCalls > g)
            return void (this._syncCalls = 0);
          if (this._pendingData += v.length, this._writeBuffer.push(v), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting)
            return;
          let u;
          for (this._isSyncWriting = !0; u = this._writeBuffer.shift(); ) {
            this._action(u);
            const e = this._callbacks.shift();
            e && e();
          }
          this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = !1, this._syncCalls = 0;
        }
        write(v, g) {
          if (this._pendingData > 5e7)
            throw new Error("write data discarded, use flow control to avoid losing data");
          if (!this._writeBuffer.length) {
            if (this._bufferOffset = 0, this._didUserInput)
              return this._didUserInput = !1, this._pendingData += v.length, this._writeBuffer.push(v), this._callbacks.push(g), void this._innerWrite();
            setTimeout(() => this._innerWrite());
          }
          this._pendingData += v.length, this._writeBuffer.push(v), this._callbacks.push(g);
        }
        _innerWrite(v = 0, g = !0) {
          const u = v || Date.now();
          for (; this._writeBuffer.length > this._bufferOffset; ) {
            const e = this._writeBuffer[this._bufferOffset], r = this._action(e, g);
            if (r) {
              const i = (l) => Date.now() - u >= 12 ? setTimeout(() => this._innerWrite(0, l)) : this._innerWrite(u, l);
              return void r.catch((l) => (queueMicrotask(() => {
                throw l;
              }), Promise.resolve(!1))).then(i);
            }
            const s = this._callbacks[this._bufferOffset];
            if (s && s(), this._bufferOffset++, this._pendingData -= e.length, Date.now() - u >= 12)
              break;
          }
          this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > 50 && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
        }
      }
      t.WriteBuffer = a;
    }, 5941: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.toRgbString = t.parseColor = void 0;
      const n = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, o = /^[\da-f]+$/;
      function _(a, d) {
        const v = a.toString(16), g = v.length < 2 ? "0" + v : v;
        switch (d) {
          case 4:
            return v[0];
          case 8:
            return g;
          case 12:
            return (g + g).slice(0, 3);
          default:
            return g + g;
        }
      }
      t.parseColor = function(a) {
        if (!a)
          return;
        let d = a.toLowerCase();
        if (d.indexOf("rgb:") === 0) {
          d = d.slice(4);
          const v = n.exec(d);
          if (v) {
            const g = v[1] ? 15 : v[4] ? 255 : v[7] ? 4095 : 65535;
            return [Math.round(parseInt(v[1] || v[4] || v[7] || v[10], 16) / g * 255), Math.round(parseInt(v[2] || v[5] || v[8] || v[11], 16) / g * 255), Math.round(parseInt(v[3] || v[6] || v[9] || v[12], 16) / g * 255)];
          }
        } else if (d.indexOf("#") === 0 && (d = d.slice(1), o.exec(d) && [3, 6, 9, 12].includes(d.length))) {
          const v = d.length / 3, g = [0, 0, 0];
          for (let u = 0; u < 3; ++u) {
            const e = parseInt(d.slice(v * u, v * u + v), 16);
            g[u] = v === 1 ? e << 4 : v === 2 ? e : v === 3 ? e >> 4 : e >> 8;
          }
          return g;
        }
      }, t.toRgbString = function(a, d = 16) {
        const [v, g, u] = a;
        return `rgb:${_(v, d)}/${_(g, d)}/${_(u, d)}`;
      };
    }, 5770: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.PAYLOAD_LIMIT = void 0, t.PAYLOAD_LIMIT = 1e7;
    }, 6351: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DcsHandler = t.DcsParser = void 0;
      const o = n(482), _ = n(8742), a = n(5770), d = [];
      t.DcsParser = class {
        constructor() {
          this._handlers = /* @__PURE__ */ Object.create(null), this._active = d, this._ident = 0, this._handlerFb = () => {
          }, this._stack = { paused: !1, loopPosition: 0, fallThrough: !1 };
        }
        dispose() {
          this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
          }, this._active = d;
        }
        registerHandler(g, u) {
          this._handlers[g] === void 0 && (this._handlers[g] = []);
          const e = this._handlers[g];
          return e.push(u), { dispose: () => {
            const r = e.indexOf(u);
            r !== -1 && e.splice(r, 1);
          } };
        }
        clearHandler(g) {
          this._handlers[g] && delete this._handlers[g];
        }
        setHandlerFallback(g) {
          this._handlerFb = g;
        }
        reset() {
          if (this._active.length)
            for (let g = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; g >= 0; --g)
              this._active[g].unhook(!1);
          this._stack.paused = !1, this._active = d, this._ident = 0;
        }
        hook(g, u) {
          if (this.reset(), this._ident = g, this._active = this._handlers[g] || d, this._active.length)
            for (let e = this._active.length - 1; e >= 0; e--)
              this._active[e].hook(u);
          else
            this._handlerFb(this._ident, "HOOK", u);
        }
        put(g, u, e) {
          if (this._active.length)
            for (let r = this._active.length - 1; r >= 0; r--)
              this._active[r].put(g, u, e);
          else
            this._handlerFb(this._ident, "PUT", (0, o.utf32ToString)(g, u, e));
        }
        unhook(g, u = !0) {
          if (this._active.length) {
            let e = !1, r = this._active.length - 1, s = !1;
            if (this._stack.paused && (r = this._stack.loopPosition - 1, e = u, s = this._stack.fallThrough, this._stack.paused = !1), !s && e === !1) {
              for (; r >= 0 && (e = this._active[r].unhook(g), e !== !0); r--)
                if (e instanceof Promise)
                  return this._stack.paused = !0, this._stack.loopPosition = r, this._stack.fallThrough = !1, e;
              r--;
            }
            for (; r >= 0; r--)
              if (e = this._active[r].unhook(!1), e instanceof Promise)
                return this._stack.paused = !0, this._stack.loopPosition = r, this._stack.fallThrough = !0, e;
          } else
            this._handlerFb(this._ident, "UNHOOK", g);
          this._active = d, this._ident = 0;
        }
      };
      const v = new _.Params();
      v.addParam(0), t.DcsHandler = class {
        constructor(g) {
          this._handler = g, this._data = "", this._params = v, this._hitLimit = !1;
        }
        hook(g) {
          this._params = g.length > 1 || g.params[0] ? g.clone() : v, this._data = "", this._hitLimit = !1;
        }
        put(g, u, e) {
          this._hitLimit || (this._data += (0, o.utf32ToString)(g, u, e), this._data.length > a.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = !0));
        }
        unhook(g) {
          let u = !1;
          if (this._hitLimit)
            u = !1;
          else if (g && (u = this._handler(this._data, this._params), u instanceof Promise))
            return u.then((e) => (this._params = v, this._data = "", this._hitLimit = !1, e));
          return this._params = v, this._data = "", this._hitLimit = !1, u;
        }
      };
    }, 2015: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.EscapeSequenceParser = t.VT500_TRANSITION_TABLE = t.TransitionTable = void 0;
      const o = n(844), _ = n(8742), a = n(6242), d = n(6351);
      class v {
        constructor(r) {
          this.table = new Uint8Array(r);
        }
        setDefault(r, s) {
          this.table.fill(r << 4 | s);
        }
        add(r, s, i, l) {
          this.table[s << 8 | r] = i << 4 | l;
        }
        addMany(r, s, i, l) {
          for (let h = 0; h < r.length; h++)
            this.table[s << 8 | r[h]] = i << 4 | l;
        }
      }
      t.TransitionTable = v;
      const g = 160;
      t.VT500_TRANSITION_TABLE = function() {
        const e = new v(4095), r = Array.apply(null, Array(256)).map((b, c) => c), s = (b, c) => r.slice(b, c), i = s(32, 127), l = s(0, 24);
        l.push(25), l.push.apply(l, s(28, 32));
        const h = s(0, 14);
        let f;
        for (f in e.setDefault(1, 0), e.addMany(i, 0, 2, 0), h)
          e.addMany([24, 26, 153, 154], f, 3, 0), e.addMany(s(128, 144), f, 3, 0), e.addMany(s(144, 152), f, 3, 0), e.add(156, f, 0, 0), e.add(27, f, 11, 1), e.add(157, f, 4, 8), e.addMany([152, 158, 159], f, 0, 7), e.add(155, f, 11, 3), e.add(144, f, 11, 9);
        return e.addMany(l, 0, 3, 0), e.addMany(l, 1, 3, 1), e.add(127, 1, 0, 1), e.addMany(l, 8, 0, 8), e.addMany(l, 3, 3, 3), e.add(127, 3, 0, 3), e.addMany(l, 4, 3, 4), e.add(127, 4, 0, 4), e.addMany(l, 6, 3, 6), e.addMany(l, 5, 3, 5), e.add(127, 5, 0, 5), e.addMany(l, 2, 3, 2), e.add(127, 2, 0, 2), e.add(93, 1, 4, 8), e.addMany(i, 8, 5, 8), e.add(127, 8, 5, 8), e.addMany([156, 27, 24, 26, 7], 8, 6, 0), e.addMany(s(28, 32), 8, 0, 8), e.addMany([88, 94, 95], 1, 0, 7), e.addMany(i, 7, 0, 7), e.addMany(l, 7, 0, 7), e.add(156, 7, 0, 0), e.add(127, 7, 0, 7), e.add(91, 1, 11, 3), e.addMany(s(64, 127), 3, 7, 0), e.addMany(s(48, 60), 3, 8, 4), e.addMany([60, 61, 62, 63], 3, 9, 4), e.addMany(s(48, 60), 4, 8, 4), e.addMany(s(64, 127), 4, 7, 0), e.addMany([60, 61, 62, 63], 4, 0, 6), e.addMany(s(32, 64), 6, 0, 6), e.add(127, 6, 0, 6), e.addMany(s(64, 127), 6, 0, 0), e.addMany(s(32, 48), 3, 9, 5), e.addMany(s(32, 48), 5, 9, 5), e.addMany(s(48, 64), 5, 0, 6), e.addMany(s(64, 127), 5, 7, 0), e.addMany(s(32, 48), 4, 9, 5), e.addMany(s(32, 48), 1, 9, 2), e.addMany(s(32, 48), 2, 9, 2), e.addMany(s(48, 127), 2, 10, 0), e.addMany(s(48, 80), 1, 10, 0), e.addMany(s(81, 88), 1, 10, 0), e.addMany([89, 90, 92], 1, 10, 0), e.addMany(s(96, 127), 1, 10, 0), e.add(80, 1, 11, 9), e.addMany(l, 9, 0, 9), e.add(127, 9, 0, 9), e.addMany(s(28, 32), 9, 0, 9), e.addMany(s(32, 48), 9, 9, 12), e.addMany(s(48, 60), 9, 8, 10), e.addMany([60, 61, 62, 63], 9, 9, 10), e.addMany(l, 11, 0, 11), e.addMany(s(32, 128), 11, 0, 11), e.addMany(s(28, 32), 11, 0, 11), e.addMany(l, 10, 0, 10), e.add(127, 10, 0, 10), e.addMany(s(28, 32), 10, 0, 10), e.addMany(s(48, 60), 10, 8, 10), e.addMany([60, 61, 62, 63], 10, 0, 11), e.addMany(s(32, 48), 10, 9, 12), e.addMany(l, 12, 0, 12), e.add(127, 12, 0, 12), e.addMany(s(28, 32), 12, 0, 12), e.addMany(s(32, 48), 12, 9, 12), e.addMany(s(48, 64), 12, 0, 11), e.addMany(s(64, 127), 12, 12, 13), e.addMany(s(64, 127), 10, 12, 13), e.addMany(s(64, 127), 9, 12, 13), e.addMany(l, 13, 13, 13), e.addMany(i, 13, 13, 13), e.add(127, 13, 0, 13), e.addMany([27, 156, 24, 26], 13, 14, 0), e.add(g, 0, 2, 0), e.add(g, 8, 5, 8), e.add(g, 6, 0, 6), e.add(g, 11, 0, 11), e.add(g, 13, 13, 13), e;
      }();
      class u extends o.Disposable {
        constructor(r = t.VT500_TRANSITION_TABLE) {
          super(), this._transitions = r, this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 }, this.initialState = 0, this.currentState = this.initialState, this._params = new _.Params(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0, this._printHandlerFb = (s, i, l) => {
          }, this._executeHandlerFb = (s) => {
          }, this._csiHandlerFb = (s, i) => {
          }, this._escHandlerFb = (s) => {
          }, this._errorHandlerFb = (s) => s, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this.register((0, o.toDisposable)(() => {
            this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null);
          })), this._oscParser = this.register(new a.OscParser()), this._dcsParser = this.register(new d.DcsParser()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => !0);
        }
        _identifier(r, s = [64, 126]) {
          let i = 0;
          if (r.prefix) {
            if (r.prefix.length > 1)
              throw new Error("only one byte as prefix supported");
            if (i = r.prefix.charCodeAt(0), i && 60 > i || i > 63)
              throw new Error("prefix must be in range 0x3c .. 0x3f");
          }
          if (r.intermediates) {
            if (r.intermediates.length > 2)
              throw new Error("only two bytes as intermediates are supported");
            for (let h = 0; h < r.intermediates.length; ++h) {
              const f = r.intermediates.charCodeAt(h);
              if (32 > f || f > 47)
                throw new Error("intermediate must be in range 0x20 .. 0x2f");
              i <<= 8, i |= f;
            }
          }
          if (r.final.length !== 1)
            throw new Error("final must be a single byte");
          const l = r.final.charCodeAt(0);
          if (s[0] > l || l > s[1])
            throw new Error(`final must be in range ${s[0]} .. ${s[1]}`);
          return i <<= 8, i |= l, i;
        }
        identToString(r) {
          const s = [];
          for (; r; )
            s.push(String.fromCharCode(255 & r)), r >>= 8;
          return s.reverse().join("");
        }
        setPrintHandler(r) {
          this._printHandler = r;
        }
        clearPrintHandler() {
          this._printHandler = this._printHandlerFb;
        }
        registerEscHandler(r, s) {
          const i = this._identifier(r, [48, 126]);
          this._escHandlers[i] === void 0 && (this._escHandlers[i] = []);
          const l = this._escHandlers[i];
          return l.push(s), { dispose: () => {
            const h = l.indexOf(s);
            h !== -1 && l.splice(h, 1);
          } };
        }
        clearEscHandler(r) {
          this._escHandlers[this._identifier(r, [48, 126])] && delete this._escHandlers[this._identifier(r, [48, 126])];
        }
        setEscHandlerFallback(r) {
          this._escHandlerFb = r;
        }
        setExecuteHandler(r, s) {
          this._executeHandlers[r.charCodeAt(0)] = s;
        }
        clearExecuteHandler(r) {
          this._executeHandlers[r.charCodeAt(0)] && delete this._executeHandlers[r.charCodeAt(0)];
        }
        setExecuteHandlerFallback(r) {
          this._executeHandlerFb = r;
        }
        registerCsiHandler(r, s) {
          const i = this._identifier(r);
          this._csiHandlers[i] === void 0 && (this._csiHandlers[i] = []);
          const l = this._csiHandlers[i];
          return l.push(s), { dispose: () => {
            const h = l.indexOf(s);
            h !== -1 && l.splice(h, 1);
          } };
        }
        clearCsiHandler(r) {
          this._csiHandlers[this._identifier(r)] && delete this._csiHandlers[this._identifier(r)];
        }
        setCsiHandlerFallback(r) {
          this._csiHandlerFb = r;
        }
        registerDcsHandler(r, s) {
          return this._dcsParser.registerHandler(this._identifier(r), s);
        }
        clearDcsHandler(r) {
          this._dcsParser.clearHandler(this._identifier(r));
        }
        setDcsHandlerFallback(r) {
          this._dcsParser.setHandlerFallback(r);
        }
        registerOscHandler(r, s) {
          return this._oscParser.registerHandler(r, s);
        }
        clearOscHandler(r) {
          this._oscParser.clearHandler(r);
        }
        setOscHandlerFallback(r) {
          this._oscParser.setHandlerFallback(r);
        }
        setErrorHandler(r) {
          this._errorHandler = r;
        }
        clearErrorHandler() {
          this._errorHandler = this._errorHandlerFb;
        }
        reset() {
          this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0, this._parseStack.state !== 0 && (this._parseStack.state = 2, this._parseStack.handlers = []);
        }
        _preserveStack(r, s, i, l, h) {
          this._parseStack.state = r, this._parseStack.handlers = s, this._parseStack.handlerPos = i, this._parseStack.transition = l, this._parseStack.chunkPos = h;
        }
        parse(r, s, i) {
          let l, h = 0, f = 0, b = 0;
          if (this._parseStack.state)
            if (this._parseStack.state === 2)
              this._parseStack.state = 0, b = this._parseStack.chunkPos + 1;
            else {
              if (i === void 0 || this._parseStack.state === 1)
                throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
              const c = this._parseStack.handlers;
              let p = this._parseStack.handlerPos - 1;
              switch (this._parseStack.state) {
                case 3:
                  if (i === !1 && p > -1) {
                    for (; p >= 0 && (l = c[p](this._params), l !== !0); p--)
                      if (l instanceof Promise)
                        return this._parseStack.handlerPos = p, l;
                  }
                  this._parseStack.handlers = [];
                  break;
                case 4:
                  if (i === !1 && p > -1) {
                    for (; p >= 0 && (l = c[p](), l !== !0); p--)
                      if (l instanceof Promise)
                        return this._parseStack.handlerPos = p, l;
                  }
                  this._parseStack.handlers = [];
                  break;
                case 6:
                  if (h = r[this._parseStack.chunkPos], l = this._dcsParser.unhook(h !== 24 && h !== 26, i), l)
                    return l;
                  h === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
                  break;
                case 5:
                  if (h = r[this._parseStack.chunkPos], l = this._oscParser.end(h !== 24 && h !== 26, i), l)
                    return l;
                  h === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
              }
              this._parseStack.state = 0, b = this._parseStack.chunkPos + 1, this.precedingCodepoint = 0, this.currentState = 15 & this._parseStack.transition;
            }
          for (let c = b; c < s; ++c) {
            switch (h = r[c], f = this._transitions.table[this.currentState << 8 | (h < 160 ? h : g)], f >> 4) {
              case 2:
                for (let T = c + 1; ; ++T) {
                  if (T >= s || (h = r[T]) < 32 || h > 126 && h < g) {
                    this._printHandler(r, c, T), c = T - 1;
                    break;
                  }
                  if (++T >= s || (h = r[T]) < 32 || h > 126 && h < g) {
                    this._printHandler(r, c, T), c = T - 1;
                    break;
                  }
                  if (++T >= s || (h = r[T]) < 32 || h > 126 && h < g) {
                    this._printHandler(r, c, T), c = T - 1;
                    break;
                  }
                  if (++T >= s || (h = r[T]) < 32 || h > 126 && h < g) {
                    this._printHandler(r, c, T), c = T - 1;
                    break;
                  }
                }
                break;
              case 3:
                this._executeHandlers[h] ? this._executeHandlers[h]() : this._executeHandlerFb(h), this.precedingCodepoint = 0;
                break;
              case 0:
                break;
              case 1:
                if (this._errorHandler({ position: c, code: h, currentState: this.currentState, collect: this._collect, params: this._params, abort: !1 }).abort)
                  return;
                break;
              case 7:
                const p = this._csiHandlers[this._collect << 8 | h];
                let L = p ? p.length - 1 : -1;
                for (; L >= 0 && (l = p[L](this._params), l !== !0); L--)
                  if (l instanceof Promise)
                    return this._preserveStack(3, p, L, f, c), l;
                L < 0 && this._csiHandlerFb(this._collect << 8 | h, this._params), this.precedingCodepoint = 0;
                break;
              case 8:
                do
                  switch (h) {
                    case 59:
                      this._params.addParam(0);
                      break;
                    case 58:
                      this._params.addSubParam(-1);
                      break;
                    default:
                      this._params.addDigit(h - 48);
                  }
                while (++c < s && (h = r[c]) > 47 && h < 60);
                c--;
                break;
              case 9:
                this._collect <<= 8, this._collect |= h;
                break;
              case 10:
                const M = this._escHandlers[this._collect << 8 | h];
                let D = M ? M.length - 1 : -1;
                for (; D >= 0 && (l = M[D](), l !== !0); D--)
                  if (l instanceof Promise)
                    return this._preserveStack(4, M, D, f, c), l;
                D < 0 && this._escHandlerFb(this._collect << 8 | h), this.precedingCodepoint = 0;
                break;
              case 11:
                this._params.reset(), this._params.addParam(0), this._collect = 0;
                break;
              case 12:
                this._dcsParser.hook(this._collect << 8 | h, this._params);
                break;
              case 13:
                for (let T = c + 1; ; ++T)
                  if (T >= s || (h = r[T]) === 24 || h === 26 || h === 27 || h > 127 && h < g) {
                    this._dcsParser.put(r, c, T), c = T - 1;
                    break;
                  }
                break;
              case 14:
                if (l = this._dcsParser.unhook(h !== 24 && h !== 26), l)
                  return this._preserveStack(6, [], 0, f, c), l;
                h === 27 && (f |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0;
                break;
              case 4:
                this._oscParser.start();
                break;
              case 5:
                for (let T = c + 1; ; T++)
                  if (T >= s || (h = r[T]) < 32 || h > 127 && h < g) {
                    this._oscParser.put(r, c, T), c = T - 1;
                    break;
                  }
                break;
              case 6:
                if (l = this._oscParser.end(h !== 24 && h !== 26), l)
                  return this._preserveStack(5, [], 0, f, c), l;
                h === 27 && (f |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0;
            }
            this.currentState = 15 & f;
          }
        }
      }
      t.EscapeSequenceParser = u;
    }, 6242: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.OscHandler = t.OscParser = void 0;
      const o = n(5770), _ = n(482), a = [];
      t.OscParser = class {
        constructor() {
          this._state = 0, this._active = a, this._id = -1, this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
          }, this._stack = { paused: !1, loopPosition: 0, fallThrough: !1 };
        }
        registerHandler(d, v) {
          this._handlers[d] === void 0 && (this._handlers[d] = []);
          const g = this._handlers[d];
          return g.push(v), { dispose: () => {
            const u = g.indexOf(v);
            u !== -1 && g.splice(u, 1);
          } };
        }
        clearHandler(d) {
          this._handlers[d] && delete this._handlers[d];
        }
        setHandlerFallback(d) {
          this._handlerFb = d;
        }
        dispose() {
          this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
          }, this._active = a;
        }
        reset() {
          if (this._state === 2)
            for (let d = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; d >= 0; --d)
              this._active[d].end(!1);
          this._stack.paused = !1, this._active = a, this._id = -1, this._state = 0;
        }
        _start() {
          if (this._active = this._handlers[this._id] || a, this._active.length)
            for (let d = this._active.length - 1; d >= 0; d--)
              this._active[d].start();
          else
            this._handlerFb(this._id, "START");
        }
        _put(d, v, g) {
          if (this._active.length)
            for (let u = this._active.length - 1; u >= 0; u--)
              this._active[u].put(d, v, g);
          else
            this._handlerFb(this._id, "PUT", (0, _.utf32ToString)(d, v, g));
        }
        start() {
          this.reset(), this._state = 1;
        }
        put(d, v, g) {
          if (this._state !== 3) {
            if (this._state === 1)
              for (; v < g; ) {
                const u = d[v++];
                if (u === 59) {
                  this._state = 2, this._start();
                  break;
                }
                if (u < 48 || 57 < u)
                  return void (this._state = 3);
                this._id === -1 && (this._id = 0), this._id = 10 * this._id + u - 48;
              }
            this._state === 2 && g - v > 0 && this._put(d, v, g);
          }
        }
        end(d, v = !0) {
          if (this._state !== 0) {
            if (this._state !== 3)
              if (this._state === 1 && this._start(), this._active.length) {
                let g = !1, u = this._active.length - 1, e = !1;
                if (this._stack.paused && (u = this._stack.loopPosition - 1, g = v, e = this._stack.fallThrough, this._stack.paused = !1), !e && g === !1) {
                  for (; u >= 0 && (g = this._active[u].end(d), g !== !0); u--)
                    if (g instanceof Promise)
                      return this._stack.paused = !0, this._stack.loopPosition = u, this._stack.fallThrough = !1, g;
                  u--;
                }
                for (; u >= 0; u--)
                  if (g = this._active[u].end(!1), g instanceof Promise)
                    return this._stack.paused = !0, this._stack.loopPosition = u, this._stack.fallThrough = !0, g;
              } else
                this._handlerFb(this._id, "END", d);
            this._active = a, this._id = -1, this._state = 0;
          }
        }
      }, t.OscHandler = class {
        constructor(d) {
          this._handler = d, this._data = "", this._hitLimit = !1;
        }
        start() {
          this._data = "", this._hitLimit = !1;
        }
        put(d, v, g) {
          this._hitLimit || (this._data += (0, _.utf32ToString)(d, v, g), this._data.length > o.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = !0));
        }
        end(d) {
          let v = !1;
          if (this._hitLimit)
            v = !1;
          else if (d && (v = this._handler(this._data), v instanceof Promise))
            return v.then((g) => (this._data = "", this._hitLimit = !1, g));
          return this._data = "", this._hitLimit = !1, v;
        }
      };
    }, 8742: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.Params = void 0;
      const n = 2147483647;
      class o {
        static fromArray(a) {
          const d = new o();
          if (!a.length)
            return d;
          for (let v = Array.isArray(a[0]) ? 1 : 0; v < a.length; ++v) {
            const g = a[v];
            if (Array.isArray(g))
              for (let u = 0; u < g.length; ++u)
                d.addSubParam(g[u]);
            else
              d.addParam(g);
          }
          return d;
        }
        constructor(a = 32, d = 32) {
          if (this.maxLength = a, this.maxSubParamsLength = d, d > 256)
            throw new Error("maxSubParamsLength must not be greater than 256");
          this.params = new Int32Array(a), this.length = 0, this._subParams = new Int32Array(d), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(a), this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
        }
        clone() {
          const a = new o(this.maxLength, this.maxSubParamsLength);
          return a.params.set(this.params), a.length = this.length, a._subParams.set(this._subParams), a._subParamsLength = this._subParamsLength, a._subParamsIdx.set(this._subParamsIdx), a._rejectDigits = this._rejectDigits, a._rejectSubDigits = this._rejectSubDigits, a._digitIsSub = this._digitIsSub, a;
        }
        toArray() {
          const a = [];
          for (let d = 0; d < this.length; ++d) {
            a.push(this.params[d]);
            const v = this._subParamsIdx[d] >> 8, g = 255 & this._subParamsIdx[d];
            g - v > 0 && a.push(Array.prototype.slice.call(this._subParams, v, g));
          }
          return a;
        }
        reset() {
          this.length = 0, this._subParamsLength = 0, this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
        }
        addParam(a) {
          if (this._digitIsSub = !1, this.length >= this.maxLength)
            this._rejectDigits = !0;
          else {
            if (a < -1)
              throw new Error("values lesser than -1 are not allowed");
            this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = a > n ? n : a;
          }
        }
        addSubParam(a) {
          if (this._digitIsSub = !0, this.length)
            if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength)
              this._rejectSubDigits = !0;
            else {
              if (a < -1)
                throw new Error("values lesser than -1 are not allowed");
              this._subParams[this._subParamsLength++] = a > n ? n : a, this._subParamsIdx[this.length - 1]++;
            }
        }
        hasSubParams(a) {
          return (255 & this._subParamsIdx[a]) - (this._subParamsIdx[a] >> 8) > 0;
        }
        getSubParams(a) {
          const d = this._subParamsIdx[a] >> 8, v = 255 & this._subParamsIdx[a];
          return v - d > 0 ? this._subParams.subarray(d, v) : null;
        }
        getSubParamsAll() {
          const a = {};
          for (let d = 0; d < this.length; ++d) {
            const v = this._subParamsIdx[d] >> 8, g = 255 & this._subParamsIdx[d];
            g - v > 0 && (a[d] = this._subParams.slice(v, g));
          }
          return a;
        }
        addDigit(a) {
          let d;
          if (this._rejectDigits || !(d = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits)
            return;
          const v = this._digitIsSub ? this._subParams : this.params, g = v[d - 1];
          v[d - 1] = ~g ? Math.min(10 * g + a, n) : a;
        }
      }
      t.Params = o;
    }, 5741: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.AddonManager = void 0, t.AddonManager = class {
        constructor() {
          this._addons = [];
        }
        dispose() {
          for (let n = this._addons.length - 1; n >= 0; n--)
            this._addons[n].instance.dispose();
        }
        loadAddon(n, o) {
          const _ = { instance: o, dispose: o.dispose, isDisposed: !1 };
          this._addons.push(_), o.dispose = () => this._wrappedAddonDispose(_), o.activate(n);
        }
        _wrappedAddonDispose(n) {
          if (n.isDisposed)
            return;
          let o = -1;
          for (let _ = 0; _ < this._addons.length; _++)
            if (this._addons[_] === n) {
              o = _;
              break;
            }
          if (o === -1)
            throw new Error("Could not dispose an addon that has not been loaded");
          n.isDisposed = !0, n.dispose.apply(n.instance), this._addons.splice(o, 1);
        }
      };
    }, 8771: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferApiView = void 0;
      const o = n(3785), _ = n(511);
      t.BufferApiView = class {
        constructor(a, d) {
          this._buffer = a, this.type = d;
        }
        init(a) {
          return this._buffer = a, this;
        }
        get cursorY() {
          return this._buffer.y;
        }
        get cursorX() {
          return this._buffer.x;
        }
        get viewportY() {
          return this._buffer.ydisp;
        }
        get baseY() {
          return this._buffer.ybase;
        }
        get length() {
          return this._buffer.lines.length;
        }
        getLine(a) {
          const d = this._buffer.lines.get(a);
          if (d)
            return new o.BufferLineApiView(d);
        }
        getNullCell() {
          return new _.CellData();
        }
      };
    }, 3785: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferLineApiView = void 0;
      const o = n(511);
      t.BufferLineApiView = class {
        constructor(_) {
          this._line = _;
        }
        get isWrapped() {
          return this._line.isWrapped;
        }
        get length() {
          return this._line.length;
        }
        getCell(_, a) {
          if (!(_ < 0 || _ >= this._line.length))
            return a ? (this._line.loadCell(_, a), a) : this._line.loadCell(_, new o.CellData());
        }
        translateToString(_, a, d) {
          return this._line.translateToString(_, a, d);
        }
      };
    }, 8285: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferNamespaceApi = void 0;
      const o = n(8771), _ = n(8460), a = n(844);
      class d extends a.Disposable {
        constructor(g) {
          super(), this._core = g, this._onBufferChange = this.register(new _.EventEmitter()), this.onBufferChange = this._onBufferChange.event, this._normal = new o.BufferApiView(this._core.buffers.normal, "normal"), this._alternate = new o.BufferApiView(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
        }
        get active() {
          if (this._core.buffers.active === this._core.buffers.normal)
            return this.normal;
          if (this._core.buffers.active === this._core.buffers.alt)
            return this.alternate;
          throw new Error("Active buffer is neither normal nor alternate");
        }
        get normal() {
          return this._normal.init(this._core.buffers.normal);
        }
        get alternate() {
          return this._alternate.init(this._core.buffers.alt);
        }
      }
      t.BufferNamespaceApi = d;
    }, 7975: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ParserApi = void 0, t.ParserApi = class {
        constructor(n) {
          this._core = n;
        }
        registerCsiHandler(n, o) {
          return this._core.registerCsiHandler(n, (_) => o(_.toArray()));
        }
        addCsiHandler(n, o) {
          return this.registerCsiHandler(n, o);
        }
        registerDcsHandler(n, o) {
          return this._core.registerDcsHandler(n, (_, a) => o(_, a.toArray()));
        }
        addDcsHandler(n, o) {
          return this.registerDcsHandler(n, o);
        }
        registerEscHandler(n, o) {
          return this._core.registerEscHandler(n, o);
        }
        addEscHandler(n, o) {
          return this.registerEscHandler(n, o);
        }
        registerOscHandler(n, o) {
          return this._core.registerOscHandler(n, o);
        }
        addOscHandler(n, o) {
          return this.registerOscHandler(n, o);
        }
      };
    }, 7090: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.UnicodeApi = void 0, t.UnicodeApi = class {
        constructor(n) {
          this._core = n;
        }
        register(n) {
          this._core.unicodeService.register(n);
        }
        get versions() {
          return this._core.unicodeService.versions;
        }
        get activeVersion() {
          return this._core.unicodeService.activeVersion;
        }
        set activeVersion(n) {
          this._core.unicodeService.activeVersion = n;
        }
      };
    }, 744: function(k, t, n) {
      var o = this && this.__decorate || function(e, r, s, i) {
        var l, h = arguments.length, f = h < 3 ? r : i === null ? i = Object.getOwnPropertyDescriptor(r, s) : i;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          f = Reflect.decorate(e, r, s, i);
        else
          for (var b = e.length - 1; b >= 0; b--)
            (l = e[b]) && (f = (h < 3 ? l(f) : h > 3 ? l(r, s, f) : l(r, s)) || f);
        return h > 3 && f && Object.defineProperty(r, s, f), f;
      }, _ = this && this.__param || function(e, r) {
        return function(s, i) {
          r(s, i, e);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.BufferService = t.MINIMUM_ROWS = t.MINIMUM_COLS = void 0;
      const a = n(8460), d = n(844), v = n(5295), g = n(2585);
      t.MINIMUM_COLS = 2, t.MINIMUM_ROWS = 1;
      let u = t.BufferService = class extends d.Disposable {
        get buffer() {
          return this.buffers.active;
        }
        constructor(e) {
          super(), this.isUserScrolling = !1, this._onResize = this.register(new a.EventEmitter()), this.onResize = this._onResize.event, this._onScroll = this.register(new a.EventEmitter()), this.onScroll = this._onScroll.event, this.cols = Math.max(e.rawOptions.cols || 0, t.MINIMUM_COLS), this.rows = Math.max(e.rawOptions.rows || 0, t.MINIMUM_ROWS), this.buffers = this.register(new v.BufferSet(e, this));
        }
        resize(e, r) {
          this.cols = e, this.rows = r, this.buffers.resize(e, r), this._onResize.fire({ cols: e, rows: r });
        }
        reset() {
          this.buffers.reset(), this.isUserScrolling = !1;
        }
        scroll(e, r = !1) {
          const s = this.buffer;
          let i;
          i = this._cachedBlankLine, i && i.length === this.cols && i.getFg(0) === e.fg && i.getBg(0) === e.bg || (i = s.getBlankLine(e, r), this._cachedBlankLine = i), i.isWrapped = r;
          const l = s.ybase + s.scrollTop, h = s.ybase + s.scrollBottom;
          if (s.scrollTop === 0) {
            const f = s.lines.isFull;
            h === s.lines.length - 1 ? f ? s.lines.recycle().copyFrom(i) : s.lines.push(i.clone()) : s.lines.splice(h + 1, 0, i.clone()), f ? this.isUserScrolling && (s.ydisp = Math.max(s.ydisp - 1, 0)) : (s.ybase++, this.isUserScrolling || s.ydisp++);
          } else {
            const f = h - l + 1;
            s.lines.shiftElements(l + 1, f - 1, -1), s.lines.set(h, i.clone());
          }
          this.isUserScrolling || (s.ydisp = s.ybase), this._onScroll.fire(s.ydisp);
        }
        scrollLines(e, r, s) {
          const i = this.buffer;
          if (e < 0) {
            if (i.ydisp === 0)
              return;
            this.isUserScrolling = !0;
          } else
            e + i.ydisp >= i.ybase && (this.isUserScrolling = !1);
          const l = i.ydisp;
          i.ydisp = Math.max(Math.min(i.ydisp + e, i.ybase), 0), l !== i.ydisp && (r || this._onScroll.fire(i.ydisp));
        }
      };
      t.BufferService = u = o([_(0, g.IOptionsService)], u);
    }, 7994: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CharsetService = void 0, t.CharsetService = class {
        constructor() {
          this.glevel = 0, this._charsets = [];
        }
        reset() {
          this.charset = void 0, this._charsets = [], this.glevel = 0;
        }
        setgLevel(n) {
          this.glevel = n, this.charset = this._charsets[n];
        }
        setgCharset(n, o) {
          this._charsets[n] = o, this.glevel === n && (this.charset = o);
        }
      };
    }, 1753: function(k, t, n) {
      var o = this && this.__decorate || function(i, l, h, f) {
        var b, c = arguments.length, p = c < 3 ? l : f === null ? f = Object.getOwnPropertyDescriptor(l, h) : f;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          p = Reflect.decorate(i, l, h, f);
        else
          for (var L = i.length - 1; L >= 0; L--)
            (b = i[L]) && (p = (c < 3 ? b(p) : c > 3 ? b(l, h, p) : b(l, h)) || p);
        return c > 3 && p && Object.defineProperty(l, h, p), p;
      }, _ = this && this.__param || function(i, l) {
        return function(h, f) {
          l(h, f, i);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CoreMouseService = void 0;
      const a = n(2585), d = n(8460), v = n(844), g = { NONE: { events: 0, restrict: () => !1 }, X10: { events: 1, restrict: (i) => i.button !== 4 && i.action === 1 && (i.ctrl = !1, i.alt = !1, i.shift = !1, !0) }, VT200: { events: 19, restrict: (i) => i.action !== 32 }, DRAG: { events: 23, restrict: (i) => i.action !== 32 || i.button !== 3 }, ANY: { events: 31, restrict: (i) => !0 } };
      function u(i, l) {
        let h = (i.ctrl ? 16 : 0) | (i.shift ? 4 : 0) | (i.alt ? 8 : 0);
        return i.button === 4 ? (h |= 64, h |= i.action) : (h |= 3 & i.button, 4 & i.button && (h |= 64), 8 & i.button && (h |= 128), i.action === 32 ? h |= 32 : i.action !== 0 || l || (h |= 3)), h;
      }
      const e = String.fromCharCode, r = { DEFAULT: (i) => {
        const l = [u(i, !1) + 32, i.col + 32, i.row + 32];
        return l[0] > 255 || l[1] > 255 || l[2] > 255 ? "" : `\x1B[M${e(l[0])}${e(l[1])}${e(l[2])}`;
      }, SGR: (i) => {
        const l = i.action === 0 && i.button !== 4 ? "m" : "M";
        return `\x1B[<${u(i, !0)};${i.col};${i.row}${l}`;
      }, SGR_PIXELS: (i) => {
        const l = i.action === 0 && i.button !== 4 ? "m" : "M";
        return `\x1B[<${u(i, !0)};${i.x};${i.y}${l}`;
      } };
      let s = t.CoreMouseService = class extends v.Disposable {
        constructor(i, l) {
          super(), this._bufferService = i, this._coreService = l, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._lastEvent = null, this._onProtocolChange = this.register(new d.EventEmitter()), this.onProtocolChange = this._onProtocolChange.event;
          for (const h of Object.keys(g))
            this.addProtocol(h, g[h]);
          for (const h of Object.keys(r))
            this.addEncoding(h, r[h]);
          this.reset();
        }
        addProtocol(i, l) {
          this._protocols[i] = l;
        }
        addEncoding(i, l) {
          this._encodings[i] = l;
        }
        get activeProtocol() {
          return this._activeProtocol;
        }
        get areMouseEventsActive() {
          return this._protocols[this._activeProtocol].events !== 0;
        }
        set activeProtocol(i) {
          if (!this._protocols[i])
            throw new Error(`unknown protocol "${i}"`);
          this._activeProtocol = i, this._onProtocolChange.fire(this._protocols[i].events);
        }
        get activeEncoding() {
          return this._activeEncoding;
        }
        set activeEncoding(i) {
          if (!this._encodings[i])
            throw new Error(`unknown encoding "${i}"`);
          this._activeEncoding = i;
        }
        reset() {
          this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null;
        }
        triggerMouseEvent(i) {
          if (i.col < 0 || i.col >= this._bufferService.cols || i.row < 0 || i.row >= this._bufferService.rows || i.button === 4 && i.action === 32 || i.button === 3 && i.action !== 32 || i.button !== 4 && (i.action === 2 || i.action === 3) || (i.col++, i.row++, i.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, i, this._activeEncoding === "SGR_PIXELS")) || !this._protocols[this._activeProtocol].restrict(i))
            return !1;
          const l = this._encodings[this._activeEncoding](i);
          return l && (this._activeEncoding === "DEFAULT" ? this._coreService.triggerBinaryEvent(l) : this._coreService.triggerDataEvent(l, !0)), this._lastEvent = i, !0;
        }
        explainEvents(i) {
          return { down: !!(1 & i), up: !!(2 & i), drag: !!(4 & i), move: !!(8 & i), wheel: !!(16 & i) };
        }
        _equalEvents(i, l, h) {
          if (h) {
            if (i.x !== l.x || i.y !== l.y)
              return !1;
          } else if (i.col !== l.col || i.row !== l.row)
            return !1;
          return i.button === l.button && i.action === l.action && i.ctrl === l.ctrl && i.alt === l.alt && i.shift === l.shift;
        }
      };
      t.CoreMouseService = s = o([_(0, a.IBufferService), _(1, a.ICoreService)], s);
    }, 6975: function(k, t, n) {
      var o = this && this.__decorate || function(s, i, l, h) {
        var f, b = arguments.length, c = b < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, l) : h;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          c = Reflect.decorate(s, i, l, h);
        else
          for (var p = s.length - 1; p >= 0; p--)
            (f = s[p]) && (c = (b < 3 ? f(c) : b > 3 ? f(i, l, c) : f(i, l)) || c);
        return b > 3 && c && Object.defineProperty(i, l, c), c;
      }, _ = this && this.__param || function(s, i) {
        return function(l, h) {
          i(l, h, s);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.CoreService = void 0;
      const a = n(1439), d = n(8460), v = n(844), g = n(2585), u = Object.freeze({ insertMode: !1 }), e = Object.freeze({ applicationCursorKeys: !1, applicationKeypad: !1, bracketedPasteMode: !1, origin: !1, reverseWraparound: !1, sendFocus: !1, wraparound: !0 });
      let r = t.CoreService = class extends v.Disposable {
        constructor(s, i, l) {
          super(), this._bufferService = s, this._logService = i, this._optionsService = l, this.isCursorInitialized = !1, this.isCursorHidden = !1, this._onData = this.register(new d.EventEmitter()), this.onData = this._onData.event, this._onUserInput = this.register(new d.EventEmitter()), this.onUserInput = this._onUserInput.event, this._onBinary = this.register(new d.EventEmitter()), this.onBinary = this._onBinary.event, this._onRequestScrollToBottom = this.register(new d.EventEmitter()), this.onRequestScrollToBottom = this._onRequestScrollToBottom.event, this.modes = (0, a.clone)(u), this.decPrivateModes = (0, a.clone)(e);
        }
        reset() {
          this.modes = (0, a.clone)(u), this.decPrivateModes = (0, a.clone)(e);
        }
        triggerDataEvent(s, i = !1) {
          if (this._optionsService.rawOptions.disableStdin)
            return;
          const l = this._bufferService.buffer;
          i && this._optionsService.rawOptions.scrollOnUserInput && l.ybase !== l.ydisp && this._onRequestScrollToBottom.fire(), i && this._onUserInput.fire(), this._logService.debug(`sending data "${s}"`, () => s.split("").map((h) => h.charCodeAt(0))), this._onData.fire(s);
        }
        triggerBinaryEvent(s) {
          this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${s}"`, () => s.split("").map((i) => i.charCodeAt(0))), this._onBinary.fire(s));
        }
      };
      t.CoreService = r = o([_(0, g.IBufferService), _(1, g.ILogService), _(2, g.IOptionsService)], r);
    }, 9074: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DecorationService = void 0;
      const o = n(8055), _ = n(8460), a = n(844), d = n(6106);
      let v = 0, g = 0;
      class u extends a.Disposable {
        get decorations() {
          return this._decorations.values();
        }
        constructor() {
          super(), this._decorations = new d.SortedList((s) => s == null ? void 0 : s.marker.line), this._onDecorationRegistered = this.register(new _.EventEmitter()), this.onDecorationRegistered = this._onDecorationRegistered.event, this._onDecorationRemoved = this.register(new _.EventEmitter()), this.onDecorationRemoved = this._onDecorationRemoved.event, this.register((0, a.toDisposable)(() => this.reset()));
        }
        registerDecoration(s) {
          if (s.marker.isDisposed)
            return;
          const i = new e(s);
          if (i) {
            const l = i.marker.onDispose(() => i.dispose());
            i.onDispose(() => {
              i && (this._decorations.delete(i) && this._onDecorationRemoved.fire(i), l.dispose());
            }), this._decorations.insert(i), this._onDecorationRegistered.fire(i);
          }
          return i;
        }
        reset() {
          for (const s of this._decorations.values())
            s.dispose();
          this._decorations.clear();
        }
        *getDecorationsAtCell(s, i, l) {
          var h, f, b;
          let c = 0, p = 0;
          for (const L of this._decorations.getKeyIterator(i))
            c = (h = L.options.x) !== null && h !== void 0 ? h : 0, p = c + ((f = L.options.width) !== null && f !== void 0 ? f : 1), s >= c && s < p && (!l || ((b = L.options.layer) !== null && b !== void 0 ? b : "bottom") === l) && (yield L);
        }
        forEachDecorationAtCell(s, i, l, h) {
          this._decorations.forEachByKey(i, (f) => {
            var b, c, p;
            v = (b = f.options.x) !== null && b !== void 0 ? b : 0, g = v + ((c = f.options.width) !== null && c !== void 0 ? c : 1), s >= v && s < g && (!l || ((p = f.options.layer) !== null && p !== void 0 ? p : "bottom") === l) && h(f);
          });
        }
      }
      t.DecorationService = u;
      class e extends a.Disposable {
        get isDisposed() {
          return this._isDisposed;
        }
        get backgroundColorRGB() {
          return this._cachedBg === null && (this.options.backgroundColor ? this._cachedBg = o.css.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
        }
        get foregroundColorRGB() {
          return this._cachedFg === null && (this.options.foregroundColor ? this._cachedFg = o.css.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
        }
        constructor(s) {
          super(), this.options = s, this.onRenderEmitter = this.register(new _.EventEmitter()), this.onRender = this.onRenderEmitter.event, this._onDispose = this.register(new _.EventEmitter()), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = s.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
        }
        dispose() {
          this._onDispose.fire(), super.dispose();
        }
      }
    }, 4348: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.InstantiationService = t.ServiceCollection = void 0;
      const o = n(2585), _ = n(8343);
      class a {
        constructor(...v) {
          this._entries = /* @__PURE__ */ new Map();
          for (const [g, u] of v)
            this.set(g, u);
        }
        set(v, g) {
          const u = this._entries.get(v);
          return this._entries.set(v, g), u;
        }
        forEach(v) {
          for (const [g, u] of this._entries.entries())
            v(g, u);
        }
        has(v) {
          return this._entries.has(v);
        }
        get(v) {
          return this._entries.get(v);
        }
      }
      t.ServiceCollection = a, t.InstantiationService = class {
        constructor() {
          this._services = new a(), this._services.set(o.IInstantiationService, this);
        }
        setService(d, v) {
          this._services.set(d, v);
        }
        getService(d) {
          return this._services.get(d);
        }
        createInstance(d, ...v) {
          const g = (0, _.getServiceDependencies)(d).sort((r, s) => r.index - s.index), u = [];
          for (const r of g) {
            const s = this._services.get(r.id);
            if (!s)
              throw new Error(`[createInstance] ${d.name} depends on UNKNOWN service ${r.id}.`);
            u.push(s);
          }
          const e = g.length > 0 ? g[0].index : v.length;
          if (v.length !== e)
            throw new Error(`[createInstance] First service dependency of ${d.name} at position ${e + 1} conflicts with ${v.length} static arguments`);
          return new d(...v, ...u);
        }
      };
    }, 7866: function(k, t, n) {
      var o = this && this.__decorate || function(e, r, s, i) {
        var l, h = arguments.length, f = h < 3 ? r : i === null ? i = Object.getOwnPropertyDescriptor(r, s) : i;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          f = Reflect.decorate(e, r, s, i);
        else
          for (var b = e.length - 1; b >= 0; b--)
            (l = e[b]) && (f = (h < 3 ? l(f) : h > 3 ? l(r, s, f) : l(r, s)) || f);
        return h > 3 && f && Object.defineProperty(r, s, f), f;
      }, _ = this && this.__param || function(e, r) {
        return function(s, i) {
          r(s, i, e);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.traceCall = t.setTraceLogger = t.LogService = void 0;
      const a = n(844), d = n(2585), v = { trace: d.LogLevelEnum.TRACE, debug: d.LogLevelEnum.DEBUG, info: d.LogLevelEnum.INFO, warn: d.LogLevelEnum.WARN, error: d.LogLevelEnum.ERROR, off: d.LogLevelEnum.OFF };
      let g, u = t.LogService = class extends a.Disposable {
        get logLevel() {
          return this._logLevel;
        }
        constructor(e) {
          super(), this._optionsService = e, this._logLevel = d.LogLevelEnum.OFF, this._updateLogLevel(), this.register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), g = this;
        }
        _updateLogLevel() {
          this._logLevel = v[this._optionsService.rawOptions.logLevel];
        }
        _evalLazyOptionalParams(e) {
          for (let r = 0; r < e.length; r++)
            typeof e[r] == "function" && (e[r] = e[r]());
        }
        _log(e, r, s) {
          this._evalLazyOptionalParams(s), e.call(console, (this._optionsService.options.logger ? "" : "xterm.js: ") + r, ...s);
        }
        trace(e, ...r) {
          var s, i;
          this._logLevel <= d.LogLevelEnum.TRACE && this._log((i = (s = this._optionsService.options.logger) === null || s === void 0 ? void 0 : s.trace.bind(this._optionsService.options.logger)) !== null && i !== void 0 ? i : console.log, e, r);
        }
        debug(e, ...r) {
          var s, i;
          this._logLevel <= d.LogLevelEnum.DEBUG && this._log((i = (s = this._optionsService.options.logger) === null || s === void 0 ? void 0 : s.debug.bind(this._optionsService.options.logger)) !== null && i !== void 0 ? i : console.log, e, r);
        }
        info(e, ...r) {
          var s, i;
          this._logLevel <= d.LogLevelEnum.INFO && this._log((i = (s = this._optionsService.options.logger) === null || s === void 0 ? void 0 : s.info.bind(this._optionsService.options.logger)) !== null && i !== void 0 ? i : console.info, e, r);
        }
        warn(e, ...r) {
          var s, i;
          this._logLevel <= d.LogLevelEnum.WARN && this._log((i = (s = this._optionsService.options.logger) === null || s === void 0 ? void 0 : s.warn.bind(this._optionsService.options.logger)) !== null && i !== void 0 ? i : console.warn, e, r);
        }
        error(e, ...r) {
          var s, i;
          this._logLevel <= d.LogLevelEnum.ERROR && this._log((i = (s = this._optionsService.options.logger) === null || s === void 0 ? void 0 : s.error.bind(this._optionsService.options.logger)) !== null && i !== void 0 ? i : console.error, e, r);
        }
      };
      t.LogService = u = o([_(0, d.IOptionsService)], u), t.setTraceLogger = function(e) {
        g = e;
      }, t.traceCall = function(e, r, s) {
        if (typeof s.value != "function")
          throw new Error("not supported");
        const i = s.value;
        s.value = function(...l) {
          if (g.logLevel !== d.LogLevelEnum.TRACE)
            return i.apply(this, l);
          g.trace(`GlyphRenderer#${i.name}(${l.map((f) => JSON.stringify(f)).join(", ")})`);
          const h = i.apply(this, l);
          return g.trace(`GlyphRenderer#${i.name} return`, h), h;
        };
      };
    }, 7302: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.OptionsService = t.DEFAULT_OPTIONS = void 0;
      const o = n(8460), _ = n(844), a = n(6114);
      t.DEFAULT_OPTIONS = { cols: 80, rows: 24, cursorBlink: !1, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: !0, drawBoldTextInBrightColors: !0, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "courier-new, courier, monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: !1, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1e3, scrollOnUserInput: !0, scrollSensitivity: 1, screenReaderMode: !1, smoothScrollDuration: 0, macOptionIsMeta: !1, macOptionClickForcesSelection: !1, minimumContrastRatio: 1, disableStdin: !1, allowProposedApi: !1, allowTransparency: !1, tabStopWidth: 8, theme: {}, rightClickSelectsWord: a.isMac, windowOptions: {}, windowsMode: !1, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: !0, convertEol: !1, termName: "xterm", cancelEvents: !1, overviewRulerWidth: 0 };
      const d = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
      class v extends _.Disposable {
        constructor(u) {
          super(), this._onOptionChange = this.register(new o.EventEmitter()), this.onOptionChange = this._onOptionChange.event;
          const e = Object.assign({}, t.DEFAULT_OPTIONS);
          for (const r in u)
            if (r in e)
              try {
                const s = u[r];
                e[r] = this._sanitizeAndValidateOption(r, s);
              } catch (s) {
                console.error(s);
              }
          this.rawOptions = e, this.options = Object.assign({}, e), this._setupOptions();
        }
        onSpecificOptionChange(u, e) {
          return this.onOptionChange((r) => {
            r === u && e(this.rawOptions[u]);
          });
        }
        onMultipleOptionChange(u, e) {
          return this.onOptionChange((r) => {
            u.indexOf(r) !== -1 && e();
          });
        }
        _setupOptions() {
          const u = (r) => {
            if (!(r in t.DEFAULT_OPTIONS))
              throw new Error(`No option with key "${r}"`);
            return this.rawOptions[r];
          }, e = (r, s) => {
            if (!(r in t.DEFAULT_OPTIONS))
              throw new Error(`No option with key "${r}"`);
            s = this._sanitizeAndValidateOption(r, s), this.rawOptions[r] !== s && (this.rawOptions[r] = s, this._onOptionChange.fire(r));
          };
          for (const r in this.rawOptions) {
            const s = { get: u.bind(this, r), set: e.bind(this, r) };
            Object.defineProperty(this.options, r, s);
          }
        }
        _sanitizeAndValidateOption(u, e) {
          switch (u) {
            case "cursorStyle":
              if (e || (e = t.DEFAULT_OPTIONS[u]), !function(r) {
                return r === "block" || r === "underline" || r === "bar";
              }(e))
                throw new Error(`"${e}" is not a valid value for ${u}`);
              break;
            case "wordSeparator":
              e || (e = t.DEFAULT_OPTIONS[u]);
              break;
            case "fontWeight":
            case "fontWeightBold":
              if (typeof e == "number" && 1 <= e && e <= 1e3)
                break;
              e = d.includes(e) ? e : t.DEFAULT_OPTIONS[u];
              break;
            case "cursorWidth":
              e = Math.floor(e);
            case "lineHeight":
            case "tabStopWidth":
              if (e < 1)
                throw new Error(`${u} cannot be less than 1, value: ${e}`);
              break;
            case "minimumContrastRatio":
              e = Math.max(1, Math.min(21, Math.round(10 * e) / 10));
              break;
            case "scrollback":
              if ((e = Math.min(e, 4294967295)) < 0)
                throw new Error(`${u} cannot be less than 0, value: ${e}`);
              break;
            case "fastScrollSensitivity":
            case "scrollSensitivity":
              if (e <= 0)
                throw new Error(`${u} cannot be less than or equal to 0, value: ${e}`);
              break;
            case "rows":
            case "cols":
              if (!e && e !== 0)
                throw new Error(`${u} must be numeric, value: ${e}`);
              break;
            case "windowsPty":
              e = e ?? {};
          }
          return e;
        }
      }
      t.OptionsService = v;
    }, 2660: function(k, t, n) {
      var o = this && this.__decorate || function(v, g, u, e) {
        var r, s = arguments.length, i = s < 3 ? g : e === null ? e = Object.getOwnPropertyDescriptor(g, u) : e;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          i = Reflect.decorate(v, g, u, e);
        else
          for (var l = v.length - 1; l >= 0; l--)
            (r = v[l]) && (i = (s < 3 ? r(i) : s > 3 ? r(g, u, i) : r(g, u)) || i);
        return s > 3 && i && Object.defineProperty(g, u, i), i;
      }, _ = this && this.__param || function(v, g) {
        return function(u, e) {
          g(u, e, v);
        };
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), t.OscLinkService = void 0;
      const a = n(2585);
      let d = t.OscLinkService = class {
        constructor(v) {
          this._bufferService = v, this._nextId = 1, this._entriesWithId = /* @__PURE__ */ new Map(), this._dataByLinkId = /* @__PURE__ */ new Map();
        }
        registerLink(v) {
          const g = this._bufferService.buffer;
          if (v.id === void 0) {
            const l = g.addMarker(g.ybase + g.y), h = { data: v, id: this._nextId++, lines: [l] };
            return l.onDispose(() => this._removeMarkerFromLink(h, l)), this._dataByLinkId.set(h.id, h), h.id;
          }
          const u = v, e = this._getEntryIdKey(u), r = this._entriesWithId.get(e);
          if (r)
            return this.addLineToLink(r.id, g.ybase + g.y), r.id;
          const s = g.addMarker(g.ybase + g.y), i = { id: this._nextId++, key: this._getEntryIdKey(u), data: u, lines: [s] };
          return s.onDispose(() => this._removeMarkerFromLink(i, s)), this._entriesWithId.set(i.key, i), this._dataByLinkId.set(i.id, i), i.id;
        }
        addLineToLink(v, g) {
          const u = this._dataByLinkId.get(v);
          if (u && u.lines.every((e) => e.line !== g)) {
            const e = this._bufferService.buffer.addMarker(g);
            u.lines.push(e), e.onDispose(() => this._removeMarkerFromLink(u, e));
          }
        }
        getLinkData(v) {
          var g;
          return (g = this._dataByLinkId.get(v)) === null || g === void 0 ? void 0 : g.data;
        }
        _getEntryIdKey(v) {
          return `${v.id};;${v.uri}`;
        }
        _removeMarkerFromLink(v, g) {
          const u = v.lines.indexOf(g);
          u !== -1 && (v.lines.splice(u, 1), v.lines.length === 0 && (v.data.id !== void 0 && this._entriesWithId.delete(v.key), this._dataByLinkId.delete(v.id)));
        }
      };
      t.OscLinkService = d = o([_(0, a.IBufferService)], d);
    }, 8343: (k, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.createDecorator = t.getServiceDependencies = t.serviceRegistry = void 0;
      const n = "di$target", o = "di$dependencies";
      t.serviceRegistry = /* @__PURE__ */ new Map(), t.getServiceDependencies = function(_) {
        return _[o] || [];
      }, t.createDecorator = function(_) {
        if (t.serviceRegistry.has(_))
          return t.serviceRegistry.get(_);
        const a = function(d, v, g) {
          if (arguments.length !== 3)
            throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
          (function(u, e, r) {
            e[n] === e ? e[o].push({ id: u, index: r }) : (e[o] = [{ id: u, index: r }], e[n] = e);
          })(a, d, g);
        };
        return a.toString = () => _, t.serviceRegistry.set(_, a), a;
      };
    }, 2585: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.IDecorationService = t.IUnicodeService = t.IOscLinkService = t.IOptionsService = t.ILogService = t.LogLevelEnum = t.IInstantiationService = t.ICharsetService = t.ICoreService = t.ICoreMouseService = t.IBufferService = void 0;
      const o = n(8343);
      var _;
      t.IBufferService = (0, o.createDecorator)("BufferService"), t.ICoreMouseService = (0, o.createDecorator)("CoreMouseService"), t.ICoreService = (0, o.createDecorator)("CoreService"), t.ICharsetService = (0, o.createDecorator)("CharsetService"), t.IInstantiationService = (0, o.createDecorator)("InstantiationService"), function(a) {
        a[a.TRACE = 0] = "TRACE", a[a.DEBUG = 1] = "DEBUG", a[a.INFO = 2] = "INFO", a[a.WARN = 3] = "WARN", a[a.ERROR = 4] = "ERROR", a[a.OFF = 5] = "OFF";
      }(_ || (t.LogLevelEnum = _ = {})), t.ILogService = (0, o.createDecorator)("LogService"), t.IOptionsService = (0, o.createDecorator)("OptionsService"), t.IOscLinkService = (0, o.createDecorator)("OscLinkService"), t.IUnicodeService = (0, o.createDecorator)("UnicodeService"), t.IDecorationService = (0, o.createDecorator)("DecorationService");
    }, 1480: (k, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.UnicodeService = void 0;
      const o = n(8460), _ = n(225);
      t.UnicodeService = class {
        constructor() {
          this._providers = /* @__PURE__ */ Object.create(null), this._active = "", this._onChange = new o.EventEmitter(), this.onChange = this._onChange.event;
          const a = new _.UnicodeV6();
          this.register(a), this._active = a.version, this._activeProvider = a;
        }
        dispose() {
          this._onChange.dispose();
        }
        get versions() {
          return Object.keys(this._providers);
        }
        get activeVersion() {
          return this._active;
        }
        set activeVersion(a) {
          if (!this._providers[a])
            throw new Error(`unknown Unicode version "${a}"`);
          this._active = a, this._activeProvider = this._providers[a], this._onChange.fire(a);
        }
        register(a) {
          this._providers[a.version] = a;
        }
        wcwidth(a) {
          return this._activeProvider.wcwidth(a);
        }
        getStringCellWidth(a) {
          let d = 0;
          const v = a.length;
          for (let g = 0; g < v; ++g) {
            let u = a.charCodeAt(g);
            if (55296 <= u && u <= 56319) {
              if (++g >= v)
                return d + this.wcwidth(u);
              const e = a.charCodeAt(g);
              56320 <= e && e <= 57343 ? u = 1024 * (u - 55296) + e - 56320 + 65536 : d += this.wcwidth(e);
            }
            d += this.wcwidth(u);
          }
          return d;
        }
      };
    } }, y = {};
    function B(k) {
      var t = y[k];
      if (t !== void 0)
        return t.exports;
      var n = y[k] = { exports: {} };
      return S[k].call(n.exports, n, n.exports, B), n.exports;
    }
    var x = {};
    return (() => {
      var k = x;
      Object.defineProperty(k, "__esModule", { value: !0 }), k.Terminal = void 0;
      const t = B(9042), n = B(3236), o = B(844), _ = B(5741), a = B(8285), d = B(7975), v = B(7090), g = ["cols", "rows"];
      class u extends o.Disposable {
        constructor(r) {
          super(), this._core = this.register(new n.Terminal(r)), this._addonManager = this.register(new _.AddonManager()), this._publicOptions = Object.assign({}, this._core.options);
          const s = (l) => this._core.options[l], i = (l, h) => {
            this._checkReadonlyOptions(l), this._core.options[l] = h;
          };
          for (const l in this._core.options) {
            const h = { get: s.bind(this, l), set: i.bind(this, l) };
            Object.defineProperty(this._publicOptions, l, h);
          }
        }
        _checkReadonlyOptions(r) {
          if (g.includes(r))
            throw new Error(`Option "${r}" can only be set in the constructor`);
        }
        _checkProposedApi() {
          if (!this._core.optionsService.rawOptions.allowProposedApi)
            throw new Error("You must set the allowProposedApi option to true to use proposed API");
        }
        get onBell() {
          return this._core.onBell;
        }
        get onBinary() {
          return this._core.onBinary;
        }
        get onCursorMove() {
          return this._core.onCursorMove;
        }
        get onData() {
          return this._core.onData;
        }
        get onKey() {
          return this._core.onKey;
        }
        get onLineFeed() {
          return this._core.onLineFeed;
        }
        get onRender() {
          return this._core.onRender;
        }
        get onResize() {
          return this._core.onResize;
        }
        get onScroll() {
          return this._core.onScroll;
        }
        get onSelectionChange() {
          return this._core.onSelectionChange;
        }
        get onTitleChange() {
          return this._core.onTitleChange;
        }
        get onWriteParsed() {
          return this._core.onWriteParsed;
        }
        get element() {
          return this._core.element;
        }
        get parser() {
          return this._parser || (this._parser = new d.ParserApi(this._core)), this._parser;
        }
        get unicode() {
          return this._checkProposedApi(), new v.UnicodeApi(this._core);
        }
        get textarea() {
          return this._core.textarea;
        }
        get rows() {
          return this._core.rows;
        }
        get cols() {
          return this._core.cols;
        }
        get buffer() {
          return this._buffer || (this._buffer = this.register(new a.BufferNamespaceApi(this._core))), this._buffer;
        }
        get markers() {
          return this._checkProposedApi(), this._core.markers;
        }
        get modes() {
          const r = this._core.coreService.decPrivateModes;
          let s = "none";
          switch (this._core.coreMouseService.activeProtocol) {
            case "X10":
              s = "x10";
              break;
            case "VT200":
              s = "vt200";
              break;
            case "DRAG":
              s = "drag";
              break;
            case "ANY":
              s = "any";
          }
          return { applicationCursorKeysMode: r.applicationCursorKeys, applicationKeypadMode: r.applicationKeypad, bracketedPasteMode: r.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: s, originMode: r.origin, reverseWraparoundMode: r.reverseWraparound, sendFocusMode: r.sendFocus, wraparoundMode: r.wraparound };
        }
        get options() {
          return this._publicOptions;
        }
        set options(r) {
          for (const s in r)
            this._publicOptions[s] = r[s];
        }
        blur() {
          this._core.blur();
        }
        focus() {
          this._core.focus();
        }
        resize(r, s) {
          this._verifyIntegers(r, s), this._core.resize(r, s);
        }
        open(r) {
          this._core.open(r);
        }
        attachCustomKeyEventHandler(r) {
          this._core.attachCustomKeyEventHandler(r);
        }
        registerLinkProvider(r) {
          return this._core.registerLinkProvider(r);
        }
        registerCharacterJoiner(r) {
          return this._checkProposedApi(), this._core.registerCharacterJoiner(r);
        }
        deregisterCharacterJoiner(r) {
          this._checkProposedApi(), this._core.deregisterCharacterJoiner(r);
        }
        registerMarker(r = 0) {
          return this._verifyIntegers(r), this._core.registerMarker(r);
        }
        registerDecoration(r) {
          var s, i, l;
          return this._checkProposedApi(), this._verifyPositiveIntegers((s = r.x) !== null && s !== void 0 ? s : 0, (i = r.width) !== null && i !== void 0 ? i : 0, (l = r.height) !== null && l !== void 0 ? l : 0), this._core.registerDecoration(r);
        }
        hasSelection() {
          return this._core.hasSelection();
        }
        select(r, s, i) {
          this._verifyIntegers(r, s, i), this._core.select(r, s, i);
        }
        getSelection() {
          return this._core.getSelection();
        }
        getSelectionPosition() {
          return this._core.getSelectionPosition();
        }
        clearSelection() {
          this._core.clearSelection();
        }
        selectAll() {
          this._core.selectAll();
        }
        selectLines(r, s) {
          this._verifyIntegers(r, s), this._core.selectLines(r, s);
        }
        dispose() {
          super.dispose();
        }
        scrollLines(r) {
          this._verifyIntegers(r), this._core.scrollLines(r);
        }
        scrollPages(r) {
          this._verifyIntegers(r), this._core.scrollPages(r);
        }
        scrollToTop() {
          this._core.scrollToTop();
        }
        scrollToBottom() {
          this._core.scrollToBottom();
        }
        scrollToLine(r) {
          this._verifyIntegers(r), this._core.scrollToLine(r);
        }
        clear() {
          this._core.clear();
        }
        write(r, s) {
          this._core.write(r, s);
        }
        writeln(r, s) {
          this._core.write(r), this._core.write(`\r
`, s);
        }
        paste(r) {
          this._core.paste(r);
        }
        refresh(r, s) {
          this._verifyIntegers(r, s), this._core.refresh(r, s);
        }
        reset() {
          this._core.reset();
        }
        clearTextureAtlas() {
          this._core.clearTextureAtlas();
        }
        loadAddon(r) {
          this._addonManager.loadAddon(this, r);
        }
        static get strings() {
          return t;
        }
        _verifyIntegers(...r) {
          for (const s of r)
            if (s === 1 / 0 || isNaN(s) || s % 1 != 0)
              throw new Error("This API only accepts integers");
        }
        _verifyPositiveIntegers(...r) {
          for (const s of r)
            if (s && (s === 1 / 0 || isNaN(s) || s % 1 != 0 || s < 0))
              throw new Error("This API only accepts positive integers");
        }
      }
      k.Terminal = u;
    })(), x;
  })());
})(Mt);
var Vt = Mt.exports;
const Gt = /* @__PURE__ */ Kt(Vt);
const {
  SvelteComponent: Xt,
  assign: Yt,
  create_slot: Jt,
  detach: Zt,
  element: $t,
  get_all_dirty_from_scope: Qt,
  get_slot_changes: ei,
  get_spread_update: ti,
  init: ii,
  insert: si,
  safe_not_equal: ri,
  set_dynamic_element_data: st,
  set_style: ne,
  toggle_class: pe,
  transition_in: Ot,
  transition_out: Pt,
  update_slot_base: ni
} = window.__gradio__svelte__internal;
function oi(E) {
  let m, S, y;
  const B = (
    /*#slots*/
    E[18].default
  ), x = Jt(
    B,
    E,
    /*$$scope*/
    E[17],
    null
  );
  let k = [
    { "data-testid": (
      /*test_id*/
      E[7]
    ) },
    { id: (
      /*elem_id*/
      E[2]
    ) },
    {
      class: S = "block " + /*elem_classes*/
      E[3].join(" ") + " svelte-1t38q2d"
    }
  ], t = {};
  for (let n = 0; n < k.length; n += 1)
    t = Yt(t, k[n]);
  return {
    c() {
      m = $t(
        /*tag*/
        E[14]
      ), x && x.c(), st(
        /*tag*/
        E[14]
      )(m, t), pe(
        m,
        "hidden",
        /*visible*/
        E[10] === !1
      ), pe(
        m,
        "padded",
        /*padding*/
        E[6]
      ), pe(
        m,
        "border_focus",
        /*border_mode*/
        E[5] === "focus"
      ), pe(m, "hide-container", !/*explicit_call*/
      E[8] && !/*container*/
      E[9]), ne(
        m,
        "height",
        /*get_dimension*/
        E[15](
          /*height*/
          E[0]
        )
      ), ne(m, "width", typeof /*width*/
      E[1] == "number" ? `calc(min(${/*width*/
      E[1]}px, 100%))` : (
        /*get_dimension*/
        E[15](
          /*width*/
          E[1]
        )
      )), ne(
        m,
        "border-style",
        /*variant*/
        E[4]
      ), ne(
        m,
        "overflow",
        /*allow_overflow*/
        E[11] ? "visible" : "hidden"
      ), ne(
        m,
        "flex-grow",
        /*scale*/
        E[12]
      ), ne(m, "min-width", `calc(min(${/*min_width*/
      E[13]}px, 100%))`), ne(m, "border-width", "var(--block-border-width)");
    },
    m(n, o) {
      si(n, m, o), x && x.m(m, null), y = !0;
    },
    p(n, o) {
      x && x.p && (!y || o & /*$$scope*/
      131072) && ni(
        x,
        B,
        n,
        /*$$scope*/
        n[17],
        y ? ei(
          B,
          /*$$scope*/
          n[17],
          o,
          null
        ) : Qt(
          /*$$scope*/
          n[17]
        ),
        null
      ), st(
        /*tag*/
        n[14]
      )(m, t = ti(k, [
        (!y || o & /*test_id*/
        128) && { "data-testid": (
          /*test_id*/
          n[7]
        ) },
        (!y || o & /*elem_id*/
        4) && { id: (
          /*elem_id*/
          n[2]
        ) },
        (!y || o & /*elem_classes*/
        8 && S !== (S = "block " + /*elem_classes*/
        n[3].join(" ") + " svelte-1t38q2d")) && { class: S }
      ])), pe(
        m,
        "hidden",
        /*visible*/
        n[10] === !1
      ), pe(
        m,
        "padded",
        /*padding*/
        n[6]
      ), pe(
        m,
        "border_focus",
        /*border_mode*/
        n[5] === "focus"
      ), pe(m, "hide-container", !/*explicit_call*/
      n[8] && !/*container*/
      n[9]), o & /*height*/
      1 && ne(
        m,
        "height",
        /*get_dimension*/
        n[15](
          /*height*/
          n[0]
        )
      ), o & /*width*/
      2 && ne(m, "width", typeof /*width*/
      n[1] == "number" ? `calc(min(${/*width*/
      n[1]}px, 100%))` : (
        /*get_dimension*/
        n[15](
          /*width*/
          n[1]
        )
      )), o & /*variant*/
      16 && ne(
        m,
        "border-style",
        /*variant*/
        n[4]
      ), o & /*allow_overflow*/
      2048 && ne(
        m,
        "overflow",
        /*allow_overflow*/
        n[11] ? "visible" : "hidden"
      ), o & /*scale*/
      4096 && ne(
        m,
        "flex-grow",
        /*scale*/
        n[12]
      ), o & /*min_width*/
      8192 && ne(m, "min-width", `calc(min(${/*min_width*/
      n[13]}px, 100%))`);
    },
    i(n) {
      y || (Ot(x, n), y = !0);
    },
    o(n) {
      Pt(x, n), y = !1;
    },
    d(n) {
      n && Zt(m), x && x.d(n);
    }
  };
}
function ai(E) {
  let m, S = (
    /*tag*/
    E[14] && oi(E)
  );
  return {
    c() {
      S && S.c();
    },
    m(y, B) {
      S && S.m(y, B), m = !0;
    },
    p(y, [B]) {
      /*tag*/
      y[14] && S.p(y, B);
    },
    i(y) {
      m || (Ot(S, y), m = !0);
    },
    o(y) {
      Pt(S, y), m = !1;
    },
    d(y) {
      S && S.d(y);
    }
  };
}
function li(E, m, S) {
  let { $$slots: y = {}, $$scope: B } = m, { height: x = void 0 } = m, { width: k = void 0 } = m, { elem_id: t = "" } = m, { elem_classes: n = [] } = m, { variant: o = "solid" } = m, { border_mode: _ = "base" } = m, { padding: a = !0 } = m, { type: d = "normal" } = m, { test_id: v = void 0 } = m, { explicit_call: g = !1 } = m, { container: u = !0 } = m, { visible: e = !0 } = m, { allow_overflow: r = !0 } = m, { scale: s = null } = m, { min_width: i = 0 } = m, l = d === "fieldset" ? "fieldset" : "div";
  const h = (f) => {
    if (f !== void 0) {
      if (typeof f == "number")
        return f + "px";
      if (typeof f == "string")
        return f;
    }
  };
  return E.$$set = (f) => {
    "height" in f && S(0, x = f.height), "width" in f && S(1, k = f.width), "elem_id" in f && S(2, t = f.elem_id), "elem_classes" in f && S(3, n = f.elem_classes), "variant" in f && S(4, o = f.variant), "border_mode" in f && S(5, _ = f.border_mode), "padding" in f && S(6, a = f.padding), "type" in f && S(16, d = f.type), "test_id" in f && S(7, v = f.test_id), "explicit_call" in f && S(8, g = f.explicit_call), "container" in f && S(9, u = f.container), "visible" in f && S(10, e = f.visible), "allow_overflow" in f && S(11, r = f.allow_overflow), "scale" in f && S(12, s = f.scale), "min_width" in f && S(13, i = f.min_width), "$$scope" in f && S(17, B = f.$$scope);
  }, [
    x,
    k,
    t,
    n,
    o,
    _,
    a,
    v,
    g,
    u,
    e,
    r,
    s,
    i,
    l,
    h,
    d,
    B,
    y
  ];
}
class hi extends Xt {
  constructor(m) {
    super(), ii(this, m, li, ai, ri, {
      height: 0,
      width: 1,
      elem_id: 2,
      elem_classes: 3,
      variant: 4,
      border_mode: 5,
      padding: 6,
      type: 16,
      test_id: 7,
      explicit_call: 8,
      container: 9,
      visible: 10,
      allow_overflow: 11,
      scale: 12,
      min_width: 13
    });
  }
}
const {
  SvelteComponent: ci,
  attr: _i,
  create_slot: di,
  detach: ui,
  element: fi,
  get_all_dirty_from_scope: vi,
  get_slot_changes: gi,
  init: pi,
  insert: mi,
  safe_not_equal: Si,
  transition_in: bi,
  transition_out: Ci,
  update_slot_base: wi
} = window.__gradio__svelte__internal;
function yi(E) {
  let m, S;
  const y = (
    /*#slots*/
    E[1].default
  ), B = di(
    y,
    E,
    /*$$scope*/
    E[0],
    null
  );
  return {
    c() {
      m = fi("div"), B && B.c(), _i(m, "class", "svelte-1hnfib2");
    },
    m(x, k) {
      mi(x, m, k), B && B.m(m, null), S = !0;
    },
    p(x, [k]) {
      B && B.p && (!S || k & /*$$scope*/
      1) && wi(
        B,
        y,
        x,
        /*$$scope*/
        x[0],
        S ? gi(
          y,
          /*$$scope*/
          x[0],
          k,
          null
        ) : vi(
          /*$$scope*/
          x[0]
        ),
        null
      );
    },
    i(x) {
      S || (bi(B, x), S = !0);
    },
    o(x) {
      Ci(B, x), S = !1;
    },
    d(x) {
      x && ui(m), B && B.d(x);
    }
  };
}
function Ei(E, m, S) {
  let { $$slots: y = {}, $$scope: B } = m;
  return E.$$set = (x) => {
    "$$scope" in x && S(0, B = x.$$scope);
  }, [B, y];
}
class ki extends ci {
  constructor(m) {
    super(), pi(this, m, Ei, yi, Si, {});
  }
}
const {
  SvelteComponent: Li,
  attr: rt,
  check_outros: Di,
  create_component: Ri,
  create_slot: Ai,
  destroy_component: Bi,
  detach: Fe,
  element: Ti,
  empty: Mi,
  get_all_dirty_from_scope: xi,
  get_slot_changes: Oi,
  group_outros: Pi,
  init: Ii,
  insert: We,
  mount_component: Hi,
  safe_not_equal: Fi,
  set_data: Wi,
  space: Ui,
  text: Ni,
  toggle_class: Ce,
  transition_in: xe,
  transition_out: Ue,
  update_slot_base: ji
} = window.__gradio__svelte__internal;
function nt(E) {
  let m, S;
  return m = new ki({
    props: {
      $$slots: { default: [zi] },
      $$scope: { ctx: E }
    }
  }), {
    c() {
      Ri(m.$$.fragment);
    },
    m(y, B) {
      Hi(m, y, B), S = !0;
    },
    p(y, B) {
      const x = {};
      B & /*$$scope, info*/
      10 && (x.$$scope = { dirty: B, ctx: y }), m.$set(x);
    },
    i(y) {
      S || (xe(m.$$.fragment, y), S = !0);
    },
    o(y) {
      Ue(m.$$.fragment, y), S = !1;
    },
    d(y) {
      Bi(m, y);
    }
  };
}
function zi(E) {
  let m;
  return {
    c() {
      m = Ni(
        /*info*/
        E[1]
      );
    },
    m(S, y) {
      We(S, m, y);
    },
    p(S, y) {
      y & /*info*/
      2 && Wi(
        m,
        /*info*/
        S[1]
      );
    },
    d(S) {
      S && Fe(m);
    }
  };
}
function qi(E) {
  let m, S, y, B;
  const x = (
    /*#slots*/
    E[2].default
  ), k = Ai(
    x,
    E,
    /*$$scope*/
    E[3],
    null
  );
  let t = (
    /*info*/
    E[1] && nt(E)
  );
  return {
    c() {
      m = Ti("span"), k && k.c(), S = Ui(), t && t.c(), y = Mi(), rt(m, "data-testid", "block-info"), rt(m, "class", "svelte-22c38v"), Ce(m, "sr-only", !/*show_label*/
      E[0]), Ce(m, "hide", !/*show_label*/
      E[0]), Ce(
        m,
        "has-info",
        /*info*/
        E[1] != null
      );
    },
    m(n, o) {
      We(n, m, o), k && k.m(m, null), We(n, S, o), t && t.m(n, o), We(n, y, o), B = !0;
    },
    p(n, [o]) {
      k && k.p && (!B || o & /*$$scope*/
      8) && ji(
        k,
        x,
        n,
        /*$$scope*/
        n[3],
        B ? Oi(
          x,
          /*$$scope*/
          n[3],
          o,
          null
        ) : xi(
          /*$$scope*/
          n[3]
        ),
        null
      ), (!B || o & /*show_label*/
      1) && Ce(m, "sr-only", !/*show_label*/
      n[0]), (!B || o & /*show_label*/
      1) && Ce(m, "hide", !/*show_label*/
      n[0]), (!B || o & /*info*/
      2) && Ce(
        m,
        "has-info",
        /*info*/
        n[1] != null
      ), /*info*/
      n[1] ? t ? (t.p(n, o), o & /*info*/
      2 && xe(t, 1)) : (t = nt(n), t.c(), xe(t, 1), t.m(y.parentNode, y)) : t && (Pi(), Ue(t, 1, 1, () => {
        t = null;
      }), Di());
    },
    i(n) {
      B || (xe(k, n), xe(t), B = !0);
    },
    o(n) {
      Ue(k, n), Ue(t), B = !1;
    },
    d(n) {
      n && (Fe(m), Fe(S), Fe(y)), k && k.d(n), t && t.d(n);
    }
  };
}
function Ki(E, m, S) {
  let { $$slots: y = {}, $$scope: B } = m, { show_label: x = !0 } = m, { info: k = void 0 } = m;
  return E.$$set = (t) => {
    "show_label" in t && S(0, x = t.show_label), "info" in t && S(1, k = t.info), "$$scope" in t && S(3, B = t.$$scope);
  }, [x, k, y, B];
}
class Vi extends Li {
  constructor(m) {
    super(), Ii(this, m, Ki, qi, Fi, { show_label: 0, info: 1 });
  }
}
const Gi = [
  { color: "red", primary: 600, secondary: 100 },
  { color: "green", primary: 600, secondary: 100 },
  { color: "blue", primary: 600, secondary: 100 },
  { color: "yellow", primary: 500, secondary: 100 },
  { color: "purple", primary: 600, secondary: 100 },
  { color: "teal", primary: 600, secondary: 100 },
  { color: "orange", primary: 600, secondary: 100 },
  { color: "cyan", primary: 600, secondary: 100 },
  { color: "lime", primary: 500, secondary: 100 },
  { color: "pink", primary: 600, secondary: 100 }
], ot = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b"
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006"
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e"
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724"
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
  }
};
Gi.reduce(
  (E, { color: m, primary: S, secondary: y }) => ({
    ...E,
    [m]: {
      primary: ot[m][S],
      secondary: ot[m][y]
    }
  }),
  {}
);
function ye(E) {
  let m = ["", "k", "M", "G", "T", "P", "E", "Z"], S = 0;
  for (; E > 1e3 && S < m.length - 1; )
    E /= 1e3, S++;
  let y = m[S];
  return (Number.isInteger(E) ? E : E.toFixed(1)) + y;
}
function Ne() {
}
function Xi(E, m) {
  return E != E ? m == m : E !== m || E && typeof E == "object" || typeof E == "function";
}
const It = typeof window < "u";
let at = It ? () => window.performance.now() : () => Date.now(), Ht = It ? (E) => requestAnimationFrame(E) : Ne;
const ke = /* @__PURE__ */ new Set();
function Ft(E) {
  ke.forEach((m) => {
    m.c(E) || (ke.delete(m), m.f());
  }), ke.size !== 0 && Ht(Ft);
}
function Yi(E) {
  let m;
  return ke.size === 0 && Ht(Ft), {
    promise: new Promise((S) => {
      ke.add(m = { c: E, f: S });
    }),
    abort() {
      ke.delete(m);
    }
  };
}
const we = [];
function Ji(E, m = Ne) {
  let S;
  const y = /* @__PURE__ */ new Set();
  function B(t) {
    if (Xi(E, t) && (E = t, S)) {
      const n = !we.length;
      for (const o of y)
        o[1](), we.push(o, E);
      if (n) {
        for (let o = 0; o < we.length; o += 2)
          we[o][0](we[o + 1]);
        we.length = 0;
      }
    }
  }
  function x(t) {
    B(t(E));
  }
  function k(t, n = Ne) {
    const o = [t, n];
    return y.add(o), y.size === 1 && (S = m(B, x) || Ne), t(E), () => {
      y.delete(o), y.size === 0 && S && (S(), S = null);
    };
  }
  return { set: B, update: x, subscribe: k };
}
function lt(E) {
  return Object.prototype.toString.call(E) === "[object Date]";
}
function Je(E, m, S, y) {
  if (typeof S == "number" || lt(S)) {
    const B = y - S, x = (S - m) / (E.dt || 1 / 60), k = E.opts.stiffness * B, t = E.opts.damping * x, n = (k - t) * E.inv_mass, o = (x + n) * E.dt;
    return Math.abs(o) < E.opts.precision && Math.abs(B) < E.opts.precision ? y : (E.settled = !1, lt(S) ? new Date(S.getTime() + o) : S + o);
  } else {
    if (Array.isArray(S))
      return S.map(
        (B, x) => Je(E, m[x], S[x], y[x])
      );
    if (typeof S == "object") {
      const B = {};
      for (const x in S)
        B[x] = Je(E, m[x], S[x], y[x]);
      return B;
    } else
      throw new Error(`Cannot spring ${typeof S} values`);
  }
}
function ht(E, m = {}) {
  const S = Ji(E), { stiffness: y = 0.15, damping: B = 0.8, precision: x = 0.01 } = m;
  let k, t, n, o = E, _ = E, a = 1, d = 0, v = !1;
  function g(e, r = {}) {
    _ = e;
    const s = n = {};
    return E == null || r.hard || u.stiffness >= 1 && u.damping >= 1 ? (v = !0, k = at(), o = e, S.set(E = _), Promise.resolve()) : (r.soft && (d = 1 / ((r.soft === !0 ? 0.5 : +r.soft) * 60), a = 0), t || (k = at(), v = !1, t = Yi((i) => {
      if (v)
        return v = !1, t = null, !1;
      a = Math.min(a + d, 1);
      const l = {
        inv_mass: a,
        opts: u,
        settled: !0,
        dt: (i - k) * 60 / 1e3
      }, h = Je(l, o, E, _);
      return k = i, o = E, S.set(E = h), l.settled && (t = null), !l.settled;
    })), new Promise((i) => {
      t.promise.then(() => {
        s === n && i();
      });
    }));
  }
  const u = {
    set: g,
    update: (e, r) => g(e(_, E), r),
    subscribe: S.subscribe,
    stiffness: y,
    damping: B,
    precision: x
  };
  return u;
}
const {
  SvelteComponent: Zi,
  append: he,
  attr: Z,
  component_subscribe: ct,
  detach: $i,
  element: Qi,
  init: es,
  insert: ts,
  noop: _t,
  safe_not_equal: is,
  set_style: Ie,
  svg_element: ce,
  toggle_class: dt
} = window.__gradio__svelte__internal, { onMount: ss } = window.__gradio__svelte__internal;
function rs(E) {
  let m, S, y, B, x, k, t, n, o, _, a, d;
  return {
    c() {
      m = Qi("div"), S = ce("svg"), y = ce("g"), B = ce("path"), x = ce("path"), k = ce("path"), t = ce("path"), n = ce("g"), o = ce("path"), _ = ce("path"), a = ce("path"), d = ce("path"), Z(B, "d", "M255.926 0.754768L509.702 139.936V221.027L255.926 81.8465V0.754768Z"), Z(B, "fill", "#FF7C00"), Z(B, "fill-opacity", "0.4"), Z(B, "class", "svelte-43sxxs"), Z(x, "d", "M509.69 139.936L254.981 279.641V361.255L509.69 221.55V139.936Z"), Z(x, "fill", "#FF7C00"), Z(x, "class", "svelte-43sxxs"), Z(k, "d", "M0.250138 139.937L254.981 279.641V361.255L0.250138 221.55V139.937Z"), Z(k, "fill", "#FF7C00"), Z(k, "fill-opacity", "0.4"), Z(k, "class", "svelte-43sxxs"), Z(t, "d", "M255.923 0.232622L0.236328 139.936V221.55L255.923 81.8469V0.232622Z"), Z(t, "fill", "#FF7C00"), Z(t, "class", "svelte-43sxxs"), Ie(y, "transform", "translate(" + /*$top*/
      E[1][0] + "px, " + /*$top*/
      E[1][1] + "px)"), Z(o, "d", "M255.926 141.5L509.702 280.681V361.773L255.926 222.592V141.5Z"), Z(o, "fill", "#FF7C00"), Z(o, "fill-opacity", "0.4"), Z(o, "class", "svelte-43sxxs"), Z(_, "d", "M509.69 280.679L254.981 420.384V501.998L509.69 362.293V280.679Z"), Z(_, "fill", "#FF7C00"), Z(_, "class", "svelte-43sxxs"), Z(a, "d", "M0.250138 280.681L254.981 420.386V502L0.250138 362.295V280.681Z"), Z(a, "fill", "#FF7C00"), Z(a, "fill-opacity", "0.4"), Z(a, "class", "svelte-43sxxs"), Z(d, "d", "M255.923 140.977L0.236328 280.68V362.294L255.923 222.591V140.977Z"), Z(d, "fill", "#FF7C00"), Z(d, "class", "svelte-43sxxs"), Ie(n, "transform", "translate(" + /*$bottom*/
      E[2][0] + "px, " + /*$bottom*/
      E[2][1] + "px)"), Z(S, "viewBox", "-1200 -1200 3000 3000"), Z(S, "fill", "none"), Z(S, "xmlns", "http://www.w3.org/2000/svg"), Z(S, "class", "svelte-43sxxs"), Z(m, "class", "svelte-43sxxs"), dt(
        m,
        "margin",
        /*margin*/
        E[0]
      );
    },
    m(v, g) {
      ts(v, m, g), he(m, S), he(S, y), he(y, B), he(y, x), he(y, k), he(y, t), he(S, n), he(n, o), he(n, _), he(n, a), he(n, d);
    },
    p(v, [g]) {
      g & /*$top*/
      2 && Ie(y, "transform", "translate(" + /*$top*/
      v[1][0] + "px, " + /*$top*/
      v[1][1] + "px)"), g & /*$bottom*/
      4 && Ie(n, "transform", "translate(" + /*$bottom*/
      v[2][0] + "px, " + /*$bottom*/
      v[2][1] + "px)"), g & /*margin*/
      1 && dt(
        m,
        "margin",
        /*margin*/
        v[0]
      );
    },
    i: _t,
    o: _t,
    d(v) {
      v && $i(m);
    }
  };
}
function ns(E, m, S) {
  let y, B, { margin: x = !0 } = m;
  const k = ht([0, 0]);
  ct(E, k, (d) => S(1, y = d));
  const t = ht([0, 0]);
  ct(E, t, (d) => S(2, B = d));
  let n;
  async function o() {
    await Promise.all([k.set([125, 140]), t.set([-125, -140])]), await Promise.all([k.set([-125, 140]), t.set([125, -140])]), await Promise.all([k.set([-125, 0]), t.set([125, -0])]), await Promise.all([k.set([125, 0]), t.set([-125, 0])]);
  }
  async function _() {
    await o(), n || _();
  }
  async function a() {
    await Promise.all([k.set([125, 0]), t.set([-125, 0])]), _();
  }
  return ss(() => (a(), () => n = !0)), E.$$set = (d) => {
    "margin" in d && S(0, x = d.margin);
  }, [x, y, B, k, t];
}
class os extends Zi {
  constructor(m) {
    super(), es(this, m, ns, rs, is, { margin: 0 });
  }
}
const {
  SvelteComponent: as,
  append: Se,
  attr: de,
  binding_callbacks: ut,
  check_outros: Wt,
  create_component: ls,
  create_slot: hs,
  destroy_component: cs,
  destroy_each: Ut,
  detach: X,
  element: fe,
  empty: Re,
  ensure_array_like: je,
  get_all_dirty_from_scope: _s,
  get_slot_changes: ds,
  group_outros: Nt,
  init: us,
  insert: Y,
  mount_component: fs,
  noop: Ze,
  safe_not_equal: vs,
  set_data: le,
  set_style: me,
  space: ue,
  text: te,
  toggle_class: ae,
  transition_in: Le,
  transition_out: De,
  update_slot_base: gs
} = window.__gradio__svelte__internal, { tick: ps } = window.__gradio__svelte__internal, { onDestroy: ms } = window.__gradio__svelte__internal, Ss = (E) => ({}), ft = (E) => ({});
function vt(E, m, S) {
  const y = E.slice();
  return y[38] = m[S], y[40] = S, y;
}
function gt(E, m, S) {
  const y = E.slice();
  return y[38] = m[S], y;
}
function bs(E) {
  let m, S = (
    /*i18n*/
    E[1]("common.error") + ""
  ), y, B, x;
  const k = (
    /*#slots*/
    E[29].error
  ), t = hs(
    k,
    E,
    /*$$scope*/
    E[28],
    ft
  );
  return {
    c() {
      m = fe("span"), y = te(S), B = ue(), t && t.c(), de(m, "class", "error svelte-1yserjw");
    },
    m(n, o) {
      Y(n, m, o), Se(m, y), Y(n, B, o), t && t.m(n, o), x = !0;
    },
    p(n, o) {
      (!x || o[0] & /*i18n*/
      2) && S !== (S = /*i18n*/
      n[1]("common.error") + "") && le(y, S), t && t.p && (!x || o[0] & /*$$scope*/
      268435456) && gs(
        t,
        k,
        n,
        /*$$scope*/
        n[28],
        x ? ds(
          k,
          /*$$scope*/
          n[28],
          o,
          Ss
        ) : _s(
          /*$$scope*/
          n[28]
        ),
        ft
      );
    },
    i(n) {
      x || (Le(t, n), x = !0);
    },
    o(n) {
      De(t, n), x = !1;
    },
    d(n) {
      n && (X(m), X(B)), t && t.d(n);
    }
  };
}
function Cs(E) {
  let m, S, y, B, x, k, t, n, o, _ = (
    /*variant*/
    E[8] === "default" && /*show_eta_bar*/
    E[18] && /*show_progress*/
    E[6] === "full" && pt(E)
  );
  function a(i, l) {
    if (
      /*progress*/
      i[7]
    )
      return Es;
    if (
      /*queue_position*/
      i[2] !== null && /*queue_size*/
      i[3] !== void 0 && /*queue_position*/
      i[2] >= 0
    )
      return ys;
    if (
      /*queue_position*/
      i[2] === 0
    )
      return ws;
  }
  let d = a(E), v = d && d(E), g = (
    /*timer*/
    E[5] && bt(E)
  );
  const u = [Rs, Ds], e = [];
  function r(i, l) {
    return (
      /*last_progress_level*/
      i[15] != null ? 0 : (
        /*show_progress*/
        i[6] === "full" ? 1 : -1
      )
    );
  }
  ~(x = r(E)) && (k = e[x] = u[x](E));
  let s = !/*timer*/
  E[5] && Dt(E);
  return {
    c() {
      _ && _.c(), m = ue(), S = fe("div"), v && v.c(), y = ue(), g && g.c(), B = ue(), k && k.c(), t = ue(), s && s.c(), n = Re(), de(S, "class", "progress-text svelte-1yserjw"), ae(
        S,
        "meta-text-center",
        /*variant*/
        E[8] === "center"
      ), ae(
        S,
        "meta-text",
        /*variant*/
        E[8] === "default"
      );
    },
    m(i, l) {
      _ && _.m(i, l), Y(i, m, l), Y(i, S, l), v && v.m(S, null), Se(S, y), g && g.m(S, null), Y(i, B, l), ~x && e[x].m(i, l), Y(i, t, l), s && s.m(i, l), Y(i, n, l), o = !0;
    },
    p(i, l) {
      /*variant*/
      i[8] === "default" && /*show_eta_bar*/
      i[18] && /*show_progress*/
      i[6] === "full" ? _ ? _.p(i, l) : (_ = pt(i), _.c(), _.m(m.parentNode, m)) : _ && (_.d(1), _ = null), d === (d = a(i)) && v ? v.p(i, l) : (v && v.d(1), v = d && d(i), v && (v.c(), v.m(S, y))), /*timer*/
      i[5] ? g ? g.p(i, l) : (g = bt(i), g.c(), g.m(S, null)) : g && (g.d(1), g = null), (!o || l[0] & /*variant*/
      256) && ae(
        S,
        "meta-text-center",
        /*variant*/
        i[8] === "center"
      ), (!o || l[0] & /*variant*/
      256) && ae(
        S,
        "meta-text",
        /*variant*/
        i[8] === "default"
      );
      let h = x;
      x = r(i), x === h ? ~x && e[x].p(i, l) : (k && (Nt(), De(e[h], 1, 1, () => {
        e[h] = null;
      }), Wt()), ~x ? (k = e[x], k ? k.p(i, l) : (k = e[x] = u[x](i), k.c()), Le(k, 1), k.m(t.parentNode, t)) : k = null), /*timer*/
      i[5] ? s && (s.d(1), s = null) : s ? s.p(i, l) : (s = Dt(i), s.c(), s.m(n.parentNode, n));
    },
    i(i) {
      o || (Le(k), o = !0);
    },
    o(i) {
      De(k), o = !1;
    },
    d(i) {
      i && (X(m), X(S), X(B), X(t), X(n)), _ && _.d(i), v && v.d(), g && g.d(), ~x && e[x].d(i), s && s.d(i);
    }
  };
}
function pt(E) {
  let m, S = `translateX(${/*eta_level*/
  (E[17] || 0) * 100 - 100}%)`;
  return {
    c() {
      m = fe("div"), de(m, "class", "eta-bar svelte-1yserjw"), me(m, "transform", S);
    },
    m(y, B) {
      Y(y, m, B);
    },
    p(y, B) {
      B[0] & /*eta_level*/
      131072 && S !== (S = `translateX(${/*eta_level*/
      (y[17] || 0) * 100 - 100}%)`) && me(m, "transform", S);
    },
    d(y) {
      y && X(m);
    }
  };
}
function ws(E) {
  let m;
  return {
    c() {
      m = te("processing |");
    },
    m(S, y) {
      Y(S, m, y);
    },
    p: Ze,
    d(S) {
      S && X(m);
    }
  };
}
function ys(E) {
  let m, S = (
    /*queue_position*/
    E[2] + 1 + ""
  ), y, B, x, k;
  return {
    c() {
      m = te("queue: "), y = te(S), B = te("/"), x = te(
        /*queue_size*/
        E[3]
      ), k = te(" |");
    },
    m(t, n) {
      Y(t, m, n), Y(t, y, n), Y(t, B, n), Y(t, x, n), Y(t, k, n);
    },
    p(t, n) {
      n[0] & /*queue_position*/
      4 && S !== (S = /*queue_position*/
      t[2] + 1 + "") && le(y, S), n[0] & /*queue_size*/
      8 && le(
        x,
        /*queue_size*/
        t[3]
      );
    },
    d(t) {
      t && (X(m), X(y), X(B), X(x), X(k));
    }
  };
}
function Es(E) {
  let m, S = je(
    /*progress*/
    E[7]
  ), y = [];
  for (let B = 0; B < S.length; B += 1)
    y[B] = St(gt(E, S, B));
  return {
    c() {
      for (let B = 0; B < y.length; B += 1)
        y[B].c();
      m = Re();
    },
    m(B, x) {
      for (let k = 0; k < y.length; k += 1)
        y[k] && y[k].m(B, x);
      Y(B, m, x);
    },
    p(B, x) {
      if (x[0] & /*progress*/
      128) {
        S = je(
          /*progress*/
          B[7]
        );
        let k;
        for (k = 0; k < S.length; k += 1) {
          const t = gt(B, S, k);
          y[k] ? y[k].p(t, x) : (y[k] = St(t), y[k].c(), y[k].m(m.parentNode, m));
        }
        for (; k < y.length; k += 1)
          y[k].d(1);
        y.length = S.length;
      }
    },
    d(B) {
      B && X(m), Ut(y, B);
    }
  };
}
function mt(E) {
  let m, S = (
    /*p*/
    E[38].unit + ""
  ), y, B, x = " ", k;
  function t(_, a) {
    return (
      /*p*/
      _[38].length != null ? Ls : ks
    );
  }
  let n = t(E), o = n(E);
  return {
    c() {
      o.c(), m = ue(), y = te(S), B = te(" | "), k = te(x);
    },
    m(_, a) {
      o.m(_, a), Y(_, m, a), Y(_, y, a), Y(_, B, a), Y(_, k, a);
    },
    p(_, a) {
      n === (n = t(_)) && o ? o.p(_, a) : (o.d(1), o = n(_), o && (o.c(), o.m(m.parentNode, m))), a[0] & /*progress*/
      128 && S !== (S = /*p*/
      _[38].unit + "") && le(y, S);
    },
    d(_) {
      _ && (X(m), X(y), X(B), X(k)), o.d(_);
    }
  };
}
function ks(E) {
  let m = ye(
    /*p*/
    E[38].index || 0
  ) + "", S;
  return {
    c() {
      S = te(m);
    },
    m(y, B) {
      Y(y, S, B);
    },
    p(y, B) {
      B[0] & /*progress*/
      128 && m !== (m = ye(
        /*p*/
        y[38].index || 0
      ) + "") && le(S, m);
    },
    d(y) {
      y && X(S);
    }
  };
}
function Ls(E) {
  let m = ye(
    /*p*/
    E[38].index || 0
  ) + "", S, y, B = ye(
    /*p*/
    E[38].length
  ) + "", x;
  return {
    c() {
      S = te(m), y = te("/"), x = te(B);
    },
    m(k, t) {
      Y(k, S, t), Y(k, y, t), Y(k, x, t);
    },
    p(k, t) {
      t[0] & /*progress*/
      128 && m !== (m = ye(
        /*p*/
        k[38].index || 0
      ) + "") && le(S, m), t[0] & /*progress*/
      128 && B !== (B = ye(
        /*p*/
        k[38].length
      ) + "") && le(x, B);
    },
    d(k) {
      k && (X(S), X(y), X(x));
    }
  };
}
function St(E) {
  let m, S = (
    /*p*/
    E[38].index != null && mt(E)
  );
  return {
    c() {
      S && S.c(), m = Re();
    },
    m(y, B) {
      S && S.m(y, B), Y(y, m, B);
    },
    p(y, B) {
      /*p*/
      y[38].index != null ? S ? S.p(y, B) : (S = mt(y), S.c(), S.m(m.parentNode, m)) : S && (S.d(1), S = null);
    },
    d(y) {
      y && X(m), S && S.d(y);
    }
  };
}
function bt(E) {
  let m, S = (
    /*eta*/
    E[0] ? `/${/*formatted_eta*/
    E[19]}` : ""
  ), y, B;
  return {
    c() {
      m = te(
        /*formatted_timer*/
        E[20]
      ), y = te(S), B = te("s");
    },
    m(x, k) {
      Y(x, m, k), Y(x, y, k), Y(x, B, k);
    },
    p(x, k) {
      k[0] & /*formatted_timer*/
      1048576 && le(
        m,
        /*formatted_timer*/
        x[20]
      ), k[0] & /*eta, formatted_eta*/
      524289 && S !== (S = /*eta*/
      x[0] ? `/${/*formatted_eta*/
      x[19]}` : "") && le(y, S);
    },
    d(x) {
      x && (X(m), X(y), X(B));
    }
  };
}
function Ds(E) {
  let m, S;
  return m = new os({
    props: { margin: (
      /*variant*/
      E[8] === "default"
    ) }
  }), {
    c() {
      ls(m.$$.fragment);
    },
    m(y, B) {
      fs(m, y, B), S = !0;
    },
    p(y, B) {
      const x = {};
      B[0] & /*variant*/
      256 && (x.margin = /*variant*/
      y[8] === "default"), m.$set(x);
    },
    i(y) {
      S || (Le(m.$$.fragment, y), S = !0);
    },
    o(y) {
      De(m.$$.fragment, y), S = !1;
    },
    d(y) {
      cs(m, y);
    }
  };
}
function Rs(E) {
  let m, S, y, B, x, k = `${/*last_progress_level*/
  E[15] * 100}%`, t = (
    /*progress*/
    E[7] != null && Ct(E)
  );
  return {
    c() {
      m = fe("div"), S = fe("div"), t && t.c(), y = ue(), B = fe("div"), x = fe("div"), de(S, "class", "progress-level-inner svelte-1yserjw"), de(x, "class", "progress-bar svelte-1yserjw"), me(x, "width", k), de(B, "class", "progress-bar-wrap svelte-1yserjw"), de(m, "class", "progress-level svelte-1yserjw");
    },
    m(n, o) {
      Y(n, m, o), Se(m, S), t && t.m(S, null), Se(m, y), Se(m, B), Se(B, x), E[30](x);
    },
    p(n, o) {
      /*progress*/
      n[7] != null ? t ? t.p(n, o) : (t = Ct(n), t.c(), t.m(S, null)) : t && (t.d(1), t = null), o[0] & /*last_progress_level*/
      32768 && k !== (k = `${/*last_progress_level*/
      n[15] * 100}%`) && me(x, "width", k);
    },
    i: Ze,
    o: Ze,
    d(n) {
      n && X(m), t && t.d(), E[30](null);
    }
  };
}
function Ct(E) {
  let m, S = je(
    /*progress*/
    E[7]
  ), y = [];
  for (let B = 0; B < S.length; B += 1)
    y[B] = Lt(vt(E, S, B));
  return {
    c() {
      for (let B = 0; B < y.length; B += 1)
        y[B].c();
      m = Re();
    },
    m(B, x) {
      for (let k = 0; k < y.length; k += 1)
        y[k] && y[k].m(B, x);
      Y(B, m, x);
    },
    p(B, x) {
      if (x[0] & /*progress_level, progress*/
      16512) {
        S = je(
          /*progress*/
          B[7]
        );
        let k;
        for (k = 0; k < S.length; k += 1) {
          const t = vt(B, S, k);
          y[k] ? y[k].p(t, x) : (y[k] = Lt(t), y[k].c(), y[k].m(m.parentNode, m));
        }
        for (; k < y.length; k += 1)
          y[k].d(1);
        y.length = S.length;
      }
    },
    d(B) {
      B && X(m), Ut(y, B);
    }
  };
}
function wt(E) {
  let m, S, y, B, x = (
    /*i*/
    E[40] !== 0 && As()
  ), k = (
    /*p*/
    E[38].desc != null && yt(E)
  ), t = (
    /*p*/
    E[38].desc != null && /*progress_level*/
    E[14] && /*progress_level*/
    E[14][
      /*i*/
      E[40]
    ] != null && Et()
  ), n = (
    /*progress_level*/
    E[14] != null && kt(E)
  );
  return {
    c() {
      x && x.c(), m = ue(), k && k.c(), S = ue(), t && t.c(), y = ue(), n && n.c(), B = Re();
    },
    m(o, _) {
      x && x.m(o, _), Y(o, m, _), k && k.m(o, _), Y(o, S, _), t && t.m(o, _), Y(o, y, _), n && n.m(o, _), Y(o, B, _);
    },
    p(o, _) {
      /*p*/
      o[38].desc != null ? k ? k.p(o, _) : (k = yt(o), k.c(), k.m(S.parentNode, S)) : k && (k.d(1), k = null), /*p*/
      o[38].desc != null && /*progress_level*/
      o[14] && /*progress_level*/
      o[14][
        /*i*/
        o[40]
      ] != null ? t || (t = Et(), t.c(), t.m(y.parentNode, y)) : t && (t.d(1), t = null), /*progress_level*/
      o[14] != null ? n ? n.p(o, _) : (n = kt(o), n.c(), n.m(B.parentNode, B)) : n && (n.d(1), n = null);
    },
    d(o) {
      o && (X(m), X(S), X(y), X(B)), x && x.d(o), k && k.d(o), t && t.d(o), n && n.d(o);
    }
  };
}
function As(E) {
  let m;
  return {
    c() {
      m = te(" /");
    },
    m(S, y) {
      Y(S, m, y);
    },
    d(S) {
      S && X(m);
    }
  };
}
function yt(E) {
  let m = (
    /*p*/
    E[38].desc + ""
  ), S;
  return {
    c() {
      S = te(m);
    },
    m(y, B) {
      Y(y, S, B);
    },
    p(y, B) {
      B[0] & /*progress*/
      128 && m !== (m = /*p*/
      y[38].desc + "") && le(S, m);
    },
    d(y) {
      y && X(S);
    }
  };
}
function Et(E) {
  let m;
  return {
    c() {
      m = te("-");
    },
    m(S, y) {
      Y(S, m, y);
    },
    d(S) {
      S && X(m);
    }
  };
}
function kt(E) {
  let m = (100 * /*progress_level*/
  (E[14][
    /*i*/
    E[40]
  ] || 0)).toFixed(1) + "", S, y;
  return {
    c() {
      S = te(m), y = te("%");
    },
    m(B, x) {
      Y(B, S, x), Y(B, y, x);
    },
    p(B, x) {
      x[0] & /*progress_level*/
      16384 && m !== (m = (100 * /*progress_level*/
      (B[14][
        /*i*/
        B[40]
      ] || 0)).toFixed(1) + "") && le(S, m);
    },
    d(B) {
      B && (X(S), X(y));
    }
  };
}
function Lt(E) {
  let m, S = (
    /*p*/
    (E[38].desc != null || /*progress_level*/
    E[14] && /*progress_level*/
    E[14][
      /*i*/
      E[40]
    ] != null) && wt(E)
  );
  return {
    c() {
      S && S.c(), m = Re();
    },
    m(y, B) {
      S && S.m(y, B), Y(y, m, B);
    },
    p(y, B) {
      /*p*/
      y[38].desc != null || /*progress_level*/
      y[14] && /*progress_level*/
      y[14][
        /*i*/
        y[40]
      ] != null ? S ? S.p(y, B) : (S = wt(y), S.c(), S.m(m.parentNode, m)) : S && (S.d(1), S = null);
    },
    d(y) {
      y && X(m), S && S.d(y);
    }
  };
}
function Dt(E) {
  let m, S;
  return {
    c() {
      m = fe("p"), S = te(
        /*loading_text*/
        E[9]
      ), de(m, "class", "loading svelte-1yserjw");
    },
    m(y, B) {
      Y(y, m, B), Se(m, S);
    },
    p(y, B) {
      B[0] & /*loading_text*/
      512 && le(
        S,
        /*loading_text*/
        y[9]
      );
    },
    d(y) {
      y && X(m);
    }
  };
}
function Bs(E) {
  let m, S, y, B, x;
  const k = [Cs, bs], t = [];
  function n(o, _) {
    return (
      /*status*/
      o[4] === "pending" ? 0 : (
        /*status*/
        o[4] === "error" ? 1 : -1
      )
    );
  }
  return ~(S = n(E)) && (y = t[S] = k[S](E)), {
    c() {
      m = fe("div"), y && y.c(), de(m, "class", B = "wrap " + /*variant*/
      E[8] + " " + /*show_progress*/
      E[6] + " svelte-1yserjw"), ae(m, "hide", !/*status*/
      E[4] || /*status*/
      E[4] === "complete" || /*show_progress*/
      E[6] === "hidden"), ae(
        m,
        "translucent",
        /*variant*/
        E[8] === "center" && /*status*/
        (E[4] === "pending" || /*status*/
        E[4] === "error") || /*translucent*/
        E[11] || /*show_progress*/
        E[6] === "minimal"
      ), ae(
        m,
        "generating",
        /*status*/
        E[4] === "generating"
      ), ae(
        m,
        "border",
        /*border*/
        E[12]
      ), me(
        m,
        "position",
        /*absolute*/
        E[10] ? "absolute" : "static"
      ), me(
        m,
        "padding",
        /*absolute*/
        E[10] ? "0" : "var(--size-8) 0"
      );
    },
    m(o, _) {
      Y(o, m, _), ~S && t[S].m(m, null), E[31](m), x = !0;
    },
    p(o, _) {
      let a = S;
      S = n(o), S === a ? ~S && t[S].p(o, _) : (y && (Nt(), De(t[a], 1, 1, () => {
        t[a] = null;
      }), Wt()), ~S ? (y = t[S], y ? y.p(o, _) : (y = t[S] = k[S](o), y.c()), Le(y, 1), y.m(m, null)) : y = null), (!x || _[0] & /*variant, show_progress*/
      320 && B !== (B = "wrap " + /*variant*/
      o[8] + " " + /*show_progress*/
      o[6] + " svelte-1yserjw")) && de(m, "class", B), (!x || _[0] & /*variant, show_progress, status, show_progress*/
      336) && ae(m, "hide", !/*status*/
      o[4] || /*status*/
      o[4] === "complete" || /*show_progress*/
      o[6] === "hidden"), (!x || _[0] & /*variant, show_progress, variant, status, translucent, show_progress*/
      2384) && ae(
        m,
        "translucent",
        /*variant*/
        o[8] === "center" && /*status*/
        (o[4] === "pending" || /*status*/
        o[4] === "error") || /*translucent*/
        o[11] || /*show_progress*/
        o[6] === "minimal"
      ), (!x || _[0] & /*variant, show_progress, status*/
      336) && ae(
        m,
        "generating",
        /*status*/
        o[4] === "generating"
      ), (!x || _[0] & /*variant, show_progress, border*/
      4416) && ae(
        m,
        "border",
        /*border*/
        o[12]
      ), _[0] & /*absolute*/
      1024 && me(
        m,
        "position",
        /*absolute*/
        o[10] ? "absolute" : "static"
      ), _[0] & /*absolute*/
      1024 && me(
        m,
        "padding",
        /*absolute*/
        o[10] ? "0" : "var(--size-8) 0"
      );
    },
    i(o) {
      x || (Le(y), x = !0);
    },
    o(o) {
      De(y), x = !1;
    },
    d(o) {
      o && X(m), ~S && t[S].d(), E[31](null);
    }
  };
}
let He = [], Xe = !1;
async function Ts(E, m = !0) {
  if (!(window.__gradio_mode__ === "website" || window.__gradio_mode__ !== "app" && m !== !0)) {
    if (He.push(E), !Xe)
      Xe = !0;
    else
      return;
    await ps(), requestAnimationFrame(() => {
      let S = [0, 0];
      for (let y = 0; y < He.length; y++) {
        const x = He[y].getBoundingClientRect();
        (y === 0 || x.top + window.scrollY <= S[0]) && (S[0] = x.top + window.scrollY, S[1] = y);
      }
      window.scrollTo({ top: S[0] - 20, behavior: "smooth" }), Xe = !1, He = [];
    });
  }
}
function Ms(E, m, S) {
  let y, { $$slots: B = {}, $$scope: x } = m, { i18n: k } = m, { eta: t = null } = m, { queue_position: n } = m, { queue_size: o } = m, { status: _ } = m, { scroll_to_output: a = !1 } = m, { timer: d = !0 } = m, { show_progress: v = "full" } = m, { message: g = null } = m, { progress: u = null } = m, { variant: e = "default" } = m, { loading_text: r = "Loading..." } = m, { absolute: s = !0 } = m, { translucent: i = !1 } = m, { border: l = !1 } = m, { autoscroll: h } = m, f, b = !1, c = 0, p = 0, L = null, M = null, D = 0, T = null, I, F = null, j = !0;
  const N = () => {
    S(0, t = S(26, L = S(19, A = null))), S(24, c = performance.now()), S(25, p = 0), b = !0, C();
  };
  function C() {
    requestAnimationFrame(() => {
      S(25, p = (performance.now() - c) / 1e3), b && C();
    });
  }
  function R() {
    S(25, p = 0), S(0, t = S(26, L = S(19, A = null))), b && (b = !1);
  }
  ms(() => {
    b && R();
  });
  let A = null;
  function O(H) {
    ut[H ? "unshift" : "push"](() => {
      F = H, S(16, F), S(7, u), S(14, T), S(15, I);
    });
  }
  function z(H) {
    ut[H ? "unshift" : "push"](() => {
      f = H, S(13, f);
    });
  }
  return E.$$set = (H) => {
    "i18n" in H && S(1, k = H.i18n), "eta" in H && S(0, t = H.eta), "queue_position" in H && S(2, n = H.queue_position), "queue_size" in H && S(3, o = H.queue_size), "status" in H && S(4, _ = H.status), "scroll_to_output" in H && S(21, a = H.scroll_to_output), "timer" in H && S(5, d = H.timer), "show_progress" in H && S(6, v = H.show_progress), "message" in H && S(22, g = H.message), "progress" in H && S(7, u = H.progress), "variant" in H && S(8, e = H.variant), "loading_text" in H && S(9, r = H.loading_text), "absolute" in H && S(10, s = H.absolute), "translucent" in H && S(11, i = H.translucent), "border" in H && S(12, l = H.border), "autoscroll" in H && S(23, h = H.autoscroll), "$$scope" in H && S(28, x = H.$$scope);
  }, E.$$.update = () => {
    E.$$.dirty[0] & /*eta, old_eta, timer_start, eta_from_start*/
    218103809 && (t === null && S(0, t = L), t != null && L !== t && (S(27, M = (performance.now() - c) / 1e3 + t), S(19, A = M.toFixed(1)), S(26, L = t))), E.$$.dirty[0] & /*eta_from_start, timer_diff*/
    167772160 && S(17, D = M === null || M <= 0 || !p ? null : Math.min(p / M, 1)), E.$$.dirty[0] & /*progress*/
    128 && u != null && S(18, j = !1), E.$$.dirty[0] & /*progress, progress_level, progress_bar, last_progress_level*/
    114816 && (u != null ? S(14, T = u.map((H) => {
      if (H.index != null && H.length != null)
        return H.index / H.length;
      if (H.progress != null)
        return H.progress;
    })) : S(14, T = null), T ? (S(15, I = T[T.length - 1]), F && (I === 0 ? S(16, F.style.transition = "0", F) : S(16, F.style.transition = "150ms", F))) : S(15, I = void 0)), E.$$.dirty[0] & /*status*/
    16 && (_ === "pending" ? N() : R()), E.$$.dirty[0] & /*el, scroll_to_output, status, autoscroll*/
    10493968 && f && a && (_ === "pending" || _ === "complete") && Ts(f, h), E.$$.dirty[0] & /*status, message*/
    4194320, E.$$.dirty[0] & /*timer_diff*/
    33554432 && S(20, y = p.toFixed(1));
  }, [
    t,
    k,
    n,
    o,
    _,
    d,
    v,
    u,
    e,
    r,
    s,
    i,
    l,
    f,
    T,
    I,
    F,
    D,
    j,
    A,
    y,
    a,
    g,
    h,
    c,
    p,
    L,
    M,
    x,
    B,
    O,
    z
  ];
}
class xs extends as {
  constructor(m) {
    super(), us(
      this,
      m,
      Ms,
      Bs,
      vs,
      {
        i18n: 1,
        eta: 0,
        queue_position: 2,
        queue_size: 3,
        status: 4,
        scroll_to_output: 21,
        timer: 5,
        show_progress: 6,
        message: 22,
        progress: 7,
        variant: 8,
        loading_text: 9,
        absolute: 10,
        translucent: 11,
        border: 12,
        autoscroll: 23
      },
      null,
      [-1, -1]
    );
  }
}
const {
  SvelteComponent: Os,
  append: Ye,
  assign: Ps,
  attr: Rt,
  binding_callbacks: Is,
  check_outros: Hs,
  create_component: et,
  destroy_component: tt,
  detach: $e,
  element: At,
  flush: re,
  get_spread_object: Fs,
  get_spread_update: Ws,
  group_outros: Us,
  init: Ns,
  insert: Qe,
  mount_component: it,
  safe_not_equal: js,
  set_data: jt,
  space: Bt,
  text: zt,
  toggle_class: zs,
  transition_in: Ee,
  transition_out: Oe
} = window.__gradio__svelte__internal, { onMount: qs } = window.__gradio__svelte__internal;
function Tt(E) {
  let m, S;
  const y = [
    { autoscroll: (
      /*gradio*/
      E[0].autoscroll
    ) },
    { i18n: (
      /*gradio*/
      E[0].i18n
    ) },
    /*loading_status*/
    E[9]
  ];
  let B = {};
  for (let x = 0; x < y.length; x += 1)
    B = Ps(B, y[x]);
  return m = new xs({ props: B }), {
    c() {
      et(m.$$.fragment);
    },
    m(x, k) {
      it(m, x, k), S = !0;
    },
    p(x, k) {
      const t = k & /*gradio, loading_status*/
      513 ? Ws(y, [
        k & /*gradio*/
        1 && { autoscroll: (
          /*gradio*/
          x[0].autoscroll
        ) },
        k & /*gradio*/
        1 && { i18n: (
          /*gradio*/
          x[0].i18n
        ) },
        k & /*loading_status*/
        512 && Fs(
          /*loading_status*/
          x[9]
        )
      ]) : {};
      m.$set(t);
    },
    i(x) {
      S || (Ee(m.$$.fragment, x), S = !0);
    },
    o(x) {
      Oe(m.$$.fragment, x), S = !1;
    },
    d(x) {
      tt(m, x);
    }
  };
}
function Ks(E) {
  let m;
  return {
    c() {
      m = zt(
        /*label*/
        E[1]
      );
    },
    m(S, y) {
      Qe(S, m, y);
    },
    p(S, y) {
      y & /*label*/
      2 && jt(
        m,
        /*label*/
        S[1]
      );
    },
    d(S) {
      S && $e(m);
    }
  };
}
function Vs(E) {
  let m, S, y, B, x, k, t, n = (
    /*loading_status*/
    E[9] && Tt(E)
  );
  return y = new Vi({
    props: {
      show_label: (
        /*show_label*/
        E[6]
      ),
      info: void 0,
      $$slots: { default: [Ks] },
      $$scope: { ctx: E }
    }
  }), {
    c() {
      n && n.c(), m = Bt(), S = At("label"), et(y.$$.fragment), B = Bt(), x = At("div"), k = zt(
        /*placeholder*/
        E[5]
      ), Rt(x, "id", "terminal"), Rt(S, "class", "svelte-2jrh70"), zs(S, "container", Xs);
    },
    m(o, _) {
      n && n.m(o, _), Qe(o, m, _), Qe(o, S, _), it(y, S, null), Ye(S, B), Ye(S, x), Ye(x, k), E[15](x), t = !0;
    },
    p(o, _) {
      /*loading_status*/
      o[9] ? n ? (n.p(o, _), _ & /*loading_status*/
      512 && Ee(n, 1)) : (n = Tt(o), n.c(), Ee(n, 1), n.m(m.parentNode, m)) : n && (Us(), Oe(n, 1, 1, () => {
        n = null;
      }), Hs());
      const a = {};
      _ & /*show_label*/
      64 && (a.show_label = /*show_label*/
      o[6]), _ & /*$$scope, label*/
      524290 && (a.$$scope = { dirty: _, ctx: o }), y.$set(a), (!t || _ & /*placeholder*/
      32) && jt(
        k,
        /*placeholder*/
        o[5]
      );
    },
    i(o) {
      t || (Ee(n), Ee(y.$$.fragment, o), t = !0);
    },
    o(o) {
      Oe(n), Oe(y.$$.fragment, o), t = !1;
    },
    d(o) {
      o && ($e(m), $e(S)), n && n.d(o), tt(y), E[15](null);
    }
  };
}
function Gs(E) {
  let m, S;
  return m = new hi({
    props: {
      visible: (
        /*visible*/
        E[4]
      ),
      elem_id: (
        /*elem_id*/
        E[2]
      ),
      elem_classes: (
        /*elem_classes*/
        E[3]
      ),
      scale: (
        /*scale*/
        E[7]
      ),
      min_width: (
        /*min_width*/
        E[8]
      ),
      allow_overflow: !1,
      padding: !0,
      $$slots: { default: [Vs] },
      $$scope: { ctx: E }
    }
  }), {
    c() {
      et(m.$$.fragment);
    },
    m(y, B) {
      it(m, y, B), S = !0;
    },
    p(y, [B]) {
      const x = {};
      B & /*visible*/
      16 && (x.visible = /*visible*/
      y[4]), B & /*elem_id*/
      4 && (x.elem_id = /*elem_id*/
      y[2]), B & /*elem_classes*/
      8 && (x.elem_classes = /*elem_classes*/
      y[3]), B & /*scale*/
      128 && (x.scale = /*scale*/
      y[7]), B & /*min_width*/
      256 && (x.min_width = /*min_width*/
      y[8]), B & /*$$scope, terminalElement, placeholder, show_label, label, gradio, loading_status*/
      525923 && (x.$$scope = { dirty: B, ctx: y }), m.$set(x);
    },
    i(y) {
      S || (Ee(m.$$.fragment, y), S = !0);
    },
    o(y) {
      Oe(m.$$.fragment, y), S = !1;
    },
    d(y) {
      tt(m, y);
    }
  };
}
const Xs = !0;
function Ys(E, m, S) {
  let y, B;
  qs(async () => {
    B = new Gt.Terminal(), B.open(y), B.write(_), B.onData((h) => {
      x.dispatch("input", { input: h });
    });
  });
  let { gradio: x } = m, { label: k = "Terminal" } = m, { elem_id: t = "" } = m, { elem_classes: n = [] } = m, { visible: o = !0 } = m, { value: _ = "" } = m, { placeholder: a = "" } = m, { show_label: d } = m, { scale: v = null } = m, { min_width: g = void 0 } = m, { loading_status: u = void 0 } = m, { value_is_output: e = !1 } = m, { interactive: r } = m, { rtl: s = !1 } = m;
  function i() {
    B && B.write(_), x.dispatch("change");
  }
  function l(h) {
    Is[h ? "unshift" : "push"](() => {
      y = h, S(10, y);
    });
  }
  return E.$$set = (h) => {
    "gradio" in h && S(0, x = h.gradio), "label" in h && S(1, k = h.label), "elem_id" in h && S(2, t = h.elem_id), "elem_classes" in h && S(3, n = h.elem_classes), "visible" in h && S(4, o = h.visible), "value" in h && S(11, _ = h.value), "placeholder" in h && S(5, a = h.placeholder), "show_label" in h && S(6, d = h.show_label), "scale" in h && S(7, v = h.scale), "min_width" in h && S(8, g = h.min_width), "loading_status" in h && S(9, u = h.loading_status), "value_is_output" in h && S(12, e = h.value_is_output), "interactive" in h && S(13, r = h.interactive), "rtl" in h && S(14, s = h.rtl);
  }, E.$$.update = () => {
    E.$$.dirty & /*value*/
    2048 && _ === null && S(11, _ = ""), E.$$.dirty & /*value*/
    2048 && i();
  }, [
    x,
    k,
    t,
    n,
    o,
    a,
    d,
    v,
    g,
    u,
    y,
    _,
    e,
    r,
    s,
    l
  ];
}
class Js extends Os {
  constructor(m) {
    super(), Ns(this, m, Ys, Gs, js, {
      gradio: 0,
      label: 1,
      elem_id: 2,
      elem_classes: 3,
      visible: 4,
      value: 11,
      placeholder: 5,
      show_label: 6,
      scale: 7,
      min_width: 8,
      loading_status: 9,
      value_is_output: 12,
      interactive: 13,
      rtl: 14
    });
  }
  get gradio() {
    return this.$$.ctx[0];
  }
  set gradio(m) {
    this.$$set({ gradio: m }), re();
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(m) {
    this.$$set({ label: m }), re();
  }
  get elem_id() {
    return this.$$.ctx[2];
  }
  set elem_id(m) {
    this.$$set({ elem_id: m }), re();
  }
  get elem_classes() {
    return this.$$.ctx[3];
  }
  set elem_classes(m) {
    this.$$set({ elem_classes: m }), re();
  }
  get visible() {
    return this.$$.ctx[4];
  }
  set visible(m) {
    this.$$set({ visible: m }), re();
  }
  get value() {
    return this.$$.ctx[11];
  }
  set value(m) {
    this.$$set({ value: m }), re();
  }
  get placeholder() {
    return this.$$.ctx[5];
  }
  set placeholder(m) {
    this.$$set({ placeholder: m }), re();
  }
  get show_label() {
    return this.$$.ctx[6];
  }
  set show_label(m) {
    this.$$set({ show_label: m }), re();
  }
  get scale() {
    return this.$$.ctx[7];
  }
  set scale(m) {
    this.$$set({ scale: m }), re();
  }
  get min_width() {
    return this.$$.ctx[8];
  }
  set min_width(m) {
    this.$$set({ min_width: m }), re();
  }
  get loading_status() {
    return this.$$.ctx[9];
  }
  set loading_status(m) {
    this.$$set({ loading_status: m }), re();
  }
  get value_is_output() {
    return this.$$.ctx[12];
  }
  set value_is_output(m) {
    this.$$set({ value_is_output: m }), re();
  }
  get interactive() {
    return this.$$.ctx[13];
  }
  set interactive(m) {
    this.$$set({ interactive: m }), re();
  }
  get rtl() {
    return this.$$.ctx[14];
  }
  set rtl(m) {
    this.$$set({ rtl: m }), re();
  }
}
export {
  Js as default
};
