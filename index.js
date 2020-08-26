/**
 * @file mofron-comp-dialog/index.js
 * @brief dialog component for mofron
 *        modal dialog, but hide when clicking outside the dialog
 * @author simpart
 */
const Modal   = require('mofron-comp-modalfil');
const Frame   = require('mofron-comp-ttlframe');
const Text    = require('mofron-comp-text');
const Button  = require('mofron-comp-button');
const Click   = require('mofron-event-click');
const ClkFcs  = require('mofron-event-clkfocus');
const vsClick = require('mofron-event-visiclick');
const HrzPos  = require('mofron-effect-hrzpos'); 
const VrtPos  = require('mofron-effect-vrtpos');
const SyncHei = require('mofron-effect-synchei');
const SyncWid = require('mofron-effect-syncwid');
const comutl  = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) title parameter
     *                object: component option
     * @short title
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('Dialog');
            this.shortForm('title');
            
            this.confmng().add("buttonEvent", { type: "event", list: true });
            
            if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
	    /* init inner comp */
	    this.frame(new Frame());
	    this.btnWrap(new mofron.class.Component());
            this.modalfil(new Modal());
            
            super.initDomConts();

            /* set close button */
            this.closeComp(
                new Text({
                    style : new mofron.class.ConfArg({ "font-family" : "auto" }, { locked: true }),
                    text  : '&times;', mainColor: [120,120,120],
                })
            );
            this.frame().header().child(this.closeComp());
            
            /* set frame contents */
            this.modalfil().child(this.frame());
            let conts = new mofron.class.Component({ effect: new SyncWid(this.frame()) });
            this.frame().child([conts, this.btnWrap()]);
            
            /* set modal */
            this.child([this.modalfil()]);
            
            /* update target dom */
            this.childDom(conts.childDom());
            this.styleDom(this.frame().childDom());
            
            /* default size */
            this.size('4rem', '3rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    

    /**
     * set button event
     * 
     * @type private
     */
    beforeRender () {
        try {
            super.beforeRender();
            /* set button event */
	    let btn  = this.button();
	    let bevt = this.buttonEvent();
	    if ( (0 < bevt.length) && (0 < btn.length) ) {
	        for (let bidx in btn) {
	            for (let eidx in bevt) {
                        btn[bidx].clickEvent(bevt[eidx][0], bevt[eidx][1]);
                    }
	        }
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dialog title
     * 
     * @param (mixed) string: title text
     *                mofron-comp-text: title text component
     * @param (dict) text config
     * @return (mofron-comp-text) title text component
     * @type parameter
     */
    title (prm, cnf) {
        try {
	    let ret = this.frame().text(prm);
            if ( (undefined !== prm) &&
                 (null === this.frame().text().style("margin-left")) ) {
                this.frame().text().style({ "margin-left" : "0.2rem" });
		this.frame().text().config(cnf);
            }
            return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * button wrapper
     * 
     * @param (component) replace button wrapper
     * @return (component) buttom wrapper component
     * @type private
     */
    btnWrap (prm) {
        try {
            if (true === comutl.iscmp(prm)) {
                prm.config({
		    style: {
		        "position" : "absolute",
			"display"  : "none"
                    },
		    effect: [
		        new VrtPos('bottom', '0.3rem'),
		        new HrzPos('center')
		    ]
		});
            }
            return this.innerComp('btnWrap', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * buttom component
     * 
     * @param (mixed) string: button text
     *                mofron-comp-button: dialog button component
     * @param (dict) button config 
     * @return (mofron-comp-button) dialog button component
     * @type parameter
     */
    button (prm, opt) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.btnWrap().child();
            }
            /* setter */
	    this.btnWrap().style({ "display" : "flex" });
            if (true === Array.isArray(prm)) {
                for (let bidx in prm) { 
                    this.button(prm[bidx], opt);
                }
                return;
            }
	    if ('string' === typeof prm) {
                prm = new Button({ text: prm, width: "1rem" });
	    }
            if (0 !== this.button().length) {
                prm.style({ 'margin-left' : '0.2rem' });
            }
	    if (undefined !== opt) {
                prm.config(opt);
	    }
            this.btnWrap().child(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * button event
     *
     * @param (function) button event
     * @param (mixed) event parameter
     * @return (array) [[event,param], ...]
     * @type parameter
     */
    buttonEvent (fnc, prm) {
        try {
	    return this.confmng("buttonEvent", fnc, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * close component in header
     * 
     * @param (component) dialog close component
     * @reutrn (component) dialog close component
     * @type parameter
     */
    closeComp (prm) {
        try {
            if (true === comutl.iscmp(prm)) {
	        let vsclk = new vsClick('disable',this);
                prm.config({
                    event  : new vsClick('disable',this),
                    effect : [
                        new SyncHei(this.frame().header()),
                        new HrzPos('right', '0.1rem')
                    ]
                });
            }
            return this.innerComp('closeComp', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dialog frame
     * 
     * @param (mofron-comp-frame) dialog frame component
     * @return (mofron-comp-frame) dialog frame component
     * @type parameter
     */
    frame (prm) {
        try {
            let ret = this.innerComp('frame', prm);
            if (undefined !== prm) {
	        let fcs = (fcs1,fcs2,fcs3) => {
                    try {
			if (false === fcs2) {
                            fcs3.visible(false);
			}
		    } catch (e) {
		        console.error(e.stack);
                        throw e;
		    }
		}
                prm.config({
		    style     : { "position" : "relative", "display" : "none" },
                    header    : new mofron.class.PullConf({ height: '0.4rem' }),
                    mainColor : [230, 230, 230], baseColor : 'white',
		    event     : new ClkFcs({
                                    listener: new mofron.class.ConfArg(fcs,this),
                                    pointer: false, tag: "Dialog",
				    suspend: true
                                }),
                    effect    : [ new HrzPos('center'), new VrtPos('center') ],
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * modalfilter component
     * 
     * @param (mofron-comp-modalfil) modal filter component
     * @return (mofron-comp-modalfil) modal filter component
     * @type private
     */
    modalfil (prm) {
       try {
           return this.innerComp('modalfil', prm);
       } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * frame header base color
     * 
     * @param (mixed) string: color name, #hex
     *                array: [red, green, blue, (alpha)]
     * @param (option) style option
     * @type parameter
     */
    mainColor (prm, opt) {
        try {
	    return this.frame().header().baseColor(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * modal base color
     * 
     * @param (mixed) string: color name, #hex
     *                array: [red, green, blue, (alpha)]
     * @param (option) style option
     * @type parameter
     */
    accentColor (prm, opt) {
        try {
	    return this.modalfil().baseColor(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set effect to frame component
     * @type private
     */
    effect (prm) {
        try {
            return this.frame().effect(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dialog height
     * 
     * @param (string (size)) dialog height
     *                        undefined: call as getter
     * @param (dict) set size option
     * @return (string (size)) dialog height
     * @type parameter
     */
    height (prm, opt) {
        try {
            return this.frame().height(prm,opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dialog header height
     * 
     * @param (string(size)) header height
     *                       undefined: call as getter
     * @param (dict) set size option
     * @return (string(size)) dialog header height
     * @type parameter
     */
    headerHeight (prm, opt) {
        try {
            return this.frame().header().height(prm, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * dialog width
     * 
     * @param (string (size)) dialog width
     *                        undefined: call as getter
     * @return (string (size)) dialog height
     * @type parameter
     */
    width (prm, opt) {
        try {
            return this.frame().width(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * modal filter, dialog frame visible
     * 
     * @type private
     */
    visible (flg, cb) {
        try {
	    if (undefined === flg) {
                /* getter */
                return this.modalfil().visible();
	    }
	    /* setter */
	    let dlg = this;
	    let fcs = this.frame().event({ name: "ClkFocus", tag: "Dialog" });
            if (true === flg) {
                this.modalfil().visible(flg, () => {
		    dlg.frame().visible(flg,cb);
		    fcs.status(flg);
		});
	    } else {
                this.frame().visible(flg, () => {
                    dlg.modalfil().visible(flg,cb);
		    fcs.status(flg);
		});
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
