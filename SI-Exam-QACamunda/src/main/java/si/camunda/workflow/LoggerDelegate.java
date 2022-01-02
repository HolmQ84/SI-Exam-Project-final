package si.camunda.workflow;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

import javax.inject.Named;
import java.util.logging.Logger;

@Named("Logger")
public class LoggerDelegate implements JavaDelegate {
    private final Logger LOGGER = Logger.getLogger(LoggerDelegate.class.getName());

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        LOGGER.info("\n\n ... Logger Delegate invoked by " +
                "processDefinitionId=" + execution.getProcessDefinitionId()
                + ", activityId=" + execution.getCurrentActivityId()
                + "\nThis is the message : " + execution.getVariable("question")
        + "\nBusiness Key = " + execution.getBusinessKey()
        + "\nMessage Name = " + execution.getCurrentActivityName());

    }
}
