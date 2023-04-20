public with sharing class TaskController {
    @AuraEnabled
    public static void createTask(String description, Date dueDate, String subject) {
        Task task = new Task();
        task.Subject = subject;
        task.ActivityDate = dueDate;
        task.Description = description;
        task.OwnerId = UserInfo.getUserId();
        insert task;
    }
}
