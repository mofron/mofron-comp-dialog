/**
 * @file mofron-comp-dialog/index.js
 * @brief dialog component for mofron
 * @author simpart
 */
const mf      = require('mofron');
const Modal   = require('mofron-comp-modalfil');
const Frame   = require('mofron-comp-ttlframe');
const Text    = require('mofron-comp-text');
const Button  = require('mofron-comp-button');
const Click   = require('mofron-event-click');
const vsClick = require('mofron-event-visiclick');
const HrzPos  = require('mofron-effect-hrzpos'); 
const VrtPos  = require('mofron-effect-vrtpos');
const SyncHei = require('mofron-effect-synchei');

mf.comp.Dialog = class extends mf.Component {
    /**
     * initialize component
     * 
     * @param (mixed) title parameter
     *                object: component option
     * @pmap title
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name('Dialog');
            this.prmMap('title');
            
            this.closeButton(
                new Text({
                    text: '&times;', mainColor: [120,120,120],
                    effect: [
                        new SyncHei(this.frame().header()),
                        new HrzPos('right', '0.1rem')
                    ]
                })
            );
            
            this.prmOpt(po);
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
            super.initDomConts();
            
            /* set close button */
            this.frame().header().child([this.closeButton()]);
            
            /* set frame contents */
            this.modal().child([this.frame()]);
            let conts = new mf.Component();
            this.frame().child([conts, this.btnWrap()]);
            
            /* set modal */
            this.child([this.modal()]);
            
            /* update target dom */
            this.target(conts.target());
            this.styleTgt(this.frame().target());
            
            /* default size */
            this.size('3.8rem', '2.8rem');
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
     * @return (mofron-comp-text) title text component
     * @type parameter
     */
    title (prm) {
        try { return this.frame().text(prm); } catch (e) {
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
            if (true === mf.func.isComp(prm)) {
                prm.option({
		    style: { "position" : "absolute" },
		    effect: [
		        new VrtPos('bottom', '0.3rem'),
		        new HrzPos('center')
		    ]
		});
            }
            return this.innerComp('btnWrap', prm, mf.Component);
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
     * @return (mofron-comp-button) dialog button component
     * @type parameter
     */
    button (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.btnWrap().child();
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let bidx in prm) { 
                    this.button(prm[bidx]);
                }
                return;
            }
	    if ('string' === typeof prm) {
                prm = new Button({ text: prm, width: "1rem"});
	    }
            
            if (0 < this.buttonEvent().length) {
                let btn_evt = this.buttonEvent();
		for (let bidx in btn_evt) {
                    prm.clickEvent(btn_evt[bidx][0], btn_evt[bidx][1]);
		}
	    }
            
            let btn_chd = this.btnWrap().child();
            if (0 !== btn_chd.length) {
                prm.option({ sizeValue: ['margin-left', '0.2rem'] });
            }
            
            this.btnWrap().child(prm);
            let wrp_wid = "0rem";
	    for (let bidx in btn_chd) {
	        wrp_wid = mf.func.sizeSum(wrp_wid, prm.width());
	        if (0 == bidx) {
                    continue;
		}
		wrp_wid = mf.func.sizeSum(wrp_wid, "0.2rem");
            }
            this.btnWrap().width(wrp_wid);
            
            return this.btnWrap().child(prm);
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
	    if (undefined === fnc) {
                return this.arrayMember("buttonEvent");
	    }
	    if ("function" !== typeof fnc) {
                throw new Error("invalid parameter");
	    }
	    this.arrayMember("buttonEvent", "object", [fnc,prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dialog close button
     * 
     * @param (component) dialog close component
     * @reutrn (component) dialog close component
     * @type parameter
     */
    closeButton (prm) {
        try {
            if (true === mf.func.isComp(prm)) {
                prm.execOption({ event: [new vsClick('disable',this)] });
            }
            return this.innerComp('closeButton', prm, mf.Component);
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
            let ret = this.innerComp('frame', prm, Frame);
            if (undefined !== prm) {
                prm.option({
		    style: { "position" : "relative" },
                    header: new mf.Option({ height: '0.4rem' }),
                    mainColor : [230, 230, 230], baseColor : 'white',
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
     * modal component
     * 
     * @param (mofron-comp-modalfil) modal filter component
     * @return (mofron-comp-modalfil) modal filter component
     * @type private
     */
    modal (prm) {
       try { return this.innerComp('modal', prm, Modal);
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
        try { return this.frame().header().baseColor(prm,opt); } catch (e) {
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
        try { return this.modal().baseColor(prm,opt); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * @type private
     */
    visible (flg, cb) {
        try { return this.modal().visible(flg, cb); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.Dialog;
/* end of file */
