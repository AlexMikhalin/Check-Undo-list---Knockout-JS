(function (ko) {
    var ChecklistViewModel = function (checklist) {
        var self = this;

        this.checklist = checklist;
        this.newTaskTitle = ko.observable('');
        this.tasks = ko.observableArray();
        this.completeTasks = ko.observableArray();

        this.addTask = function () {
            this.checklist.addTask(this.newTaskTitle());
            this.newTaskTitle('');
            this.tasks(this.checklist.tasks);
        };

        this.removeTask = function (taskObject, event) {
            self.checklist.removeTask(taskObject.id);
            self.tasks(self.checklist.tasks);
        };

        this.checkTask = function (taskObject, event) {
            self.checklist.checkTask(taskObject.id);
            self.tasks(self.checklist.tasks);
            self.completeTasks(self.checklist.completeTasks);
        };

        this.undoTask = function (taskObject, event) {
            self.checklist.undoTask(taskObject.id);
            self.tasks(self.checklist.tasks);
            self.completeTasks(self.checklist.completeTasks);
        };
    };

    var Checklist = function() {
        this.tasks = [];
        this.completeTasks = [];

        this.addTask = function (taskTitle) {
            this.tasks.push({
                id: this.tasks.length,
                title: taskTitle
            });
        };

        this.removeTask = function (id) {
            var taskIndex = this.getIndexById(id, this.tasks);

            if ( typeof taskIndex !== 'undefined') {
                this.tasks.splice(taskIndex, 1);
            }
        };

        this.checkTask = function (id) {
            var taskIndex = this.getIndexById(id, this.tasks);
            var task;

            if ( typeof taskIndex !== 'undefined') {
                task = this.tasks[taskIndex];
                this.tasks.splice(taskIndex, 1);
                this.completeTasks.push(task);
            }
        };

        this.undoTask = function (id) {
            var taskIndex = this.getIndexById(id, this.completeTasks);
            var task;

            if ( typeof taskIndex !== 'undefined') {
                task = this.completeTasks[taskIndex];
                this.completeTasks.splice(taskIndex, 1);
                this.tasks.push(task);
            }
        };

        this.getIndexById = function (id, tasks) {
            var index;

            for (var i = 0, max = tasks.length; i < max; i++)
            {
                if (tasks[i].id === id)
                {
                    index = i;
                    break;
                }
            }

            return index;
        }
    };

    var checkList = new Checklist();

    ko.applyBindings(new ChecklistViewModel(checkList), document.getElementById('todoList'));

})(ko);