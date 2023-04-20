import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createTask from '@salesforce/apex/TaskController.createTask';

export default class TaskTracker extends LightningElement {
    @api recordId;
    taskDescription = '';
    subject = '';
    dueDate = '';

    handleTaskDescriptionChange(event) {
        this.taskDescription = event.target.value;
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleDueDateChange(event) {
        this.dueDate = event.target.value;
    }

    handleAddTask() {
        createTask({
            description: this.taskDescription,
            dueDate: this.dueDate,
            subject: this.subject
        })
            .then(() => {
                this.showToast('Success', 'Task created successfully', 'success');
                this.taskDescription = '';
                this.subject = '';
                this.dueDate = '';
            })
            .catch((error) => {
                this.showToast('Error', 'Error creating task', 'error');
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}
