Module.register("MMM-ModulesGroupsRotation", {
    // Module config defaults.
    defaults: {
        modulesGroups: [],
        rotationTime: 3000,
        animationDelay: 1000 // Animation delay in milliseconds
    },

    // Define start sequence.
    start() {
        Log.log(`Page start timer for rotating modules`);
        this.curGroup = 0;
        this.timer = setInterval(() => {
            this.rotateModules();
        }, this.config.rotationTime);
    },

    rotateModules: function () {
        this.curGroup = (this.curGroup + 1) % this.config.modulesGroups.length;
        Log.log(`this.curGroup:`, this.curGroup);

        // Hide all modules first with a transition
       this.hideAllModules();

        // Show modules in the current group after a short delay to allow hide transition to complete
        setTimeout(() => {
            this.showCurrentGroup()
        }, this.config.animationDelay); 
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
        this.hideAllModules();
        this.showCurrentGroup();
        return wrapper;
    },

    
});
