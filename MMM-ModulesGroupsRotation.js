Module.register("MMM-ModulesGroupsRotation", {
    // Module config defaults.
    defaults: {
        modulesGroups: [["string"]],
        rotationTime: 3000,
        animationDelay: 1000,// Animation delay in milliseconds
        groupDelay:[{groupNumber:1,timeout:10000}]
    },
    // used to calc delay for individual groups
    timeout_delay:0,
    // Define start sequence.
    start() {
        Log.log(`Page start timer for rotating modules`);
        this.curGroup = -1;
        // if no separate group delays
        if(this.groupDelay.length==0){
            // do it like before
            this.timer = setInterval(() => {
                this.rotateModules();
            }, this.config.rotationTime);
        }
    },

    rotateModules: function () {
        // Hide all modules first with a transition
        this.hideAllModules();

        this.curGroup = (this.curGroup + 1) % this.config.modulesGroups.length;
        Log.log(`this.curGroup:`, this.curGroup);

        this.timeout_delay=this.config.rotationTime
        for(group of groupDelay){
            if((group.groupNumber>0) && ((group.groupNumber-1) == this.curGroup)){
                this.timeout_delay=group.timeout
                break;
            }
        }
        // fire quickly on startup
        let animationDelay= this.curGroup == 0?1:this.config.animationDelay
        // Show modules in the current group after a short delay to allow hide transition to complete
        setTimeout(() => {
            this.showCurrentGroup()
            if(this.groupDelay.length){
                this.timer = setTimeout(() => {
                    this.rotateModules();
                }, this.timeout_delay);
            }
        }, animationDelay);
    },

    fadeOut(module) {
        module.hide(this.config.animationDelay, function() {
            Log.log(`Module ${module.name} hidden`);
        });
        module.hidden = true;
    },

    fadeIn(module) {
        module.show(this.config.animationDelay, function() {
            Log.log(`Module ${module.name} shown`);
        });
        module.hidden = false;
    },

    hideAllModules() {
        MM.getModules().enumerate(module => {
            this.fadeOut(module);
        });
    },

    showCurrentGroup() {
        
        this.config.modulesGroups[this.curGroup].forEach(moduleName => {
            MM.getModules().withClass(moduleName).enumerate(module => {
                this.fadeIn(module);
            });
        });
    },
    

    // Override dom generator.
    getDom() {
        const wrapper = document.createElement("div");
        this.rotateModules();
        return wrapper;
    },

    
});
