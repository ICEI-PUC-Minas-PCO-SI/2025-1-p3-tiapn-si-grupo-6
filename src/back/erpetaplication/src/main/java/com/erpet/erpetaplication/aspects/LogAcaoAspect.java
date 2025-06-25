package com.erpet.erpetaplication.aspects;

import com.erpet.erpetaplication.annotations.LoggableAcao;
import com.erpet.erpetaplication.security.JwtUtil;
import com.erpet.erpetaplication.service.IServiceHistorico;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.EvaluationContext;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.expression.common.TemplateParserContext;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAcaoAspect {

    @Autowired
    private IServiceHistorico historicoService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    @Around("@annotation(loggableAcao)")
    public Object logarAcao(ProceedingJoinPoint joinPoint, LoggableAcao loggableAcao) throws Throwable {
        String descricao = resolverMensagem(joinPoint, loggableAcao.value());

        String login = jwtUtil.extractLoginFromRequest(request);

        Object retorno = joinPoint.proceed();

        historicoService.salvarLog(login, descricao);

        return retorno;
    }

    private String resolverMensagem(ProceedingJoinPoint joinPoint, String expressao) {
        try {
            ExpressionParser parser = new SpelExpressionParser();
            EvaluationContext context = new StandardEvaluationContext();

            String[] paramNames = ((MethodSignature) joinPoint.getSignature()).getParameterNames();
            Object[] paramValues = joinPoint.getArgs();

            for (int i = 0; i < paramNames.length; i++) {
                context.setVariable(paramNames[i], paramValues[i]);
            }

            return parser.parseExpression(expressao, new TemplateParserContext())
                    .getValue(context, String.class);
        } catch (Exception e) {
            return "Erro ao processar expressão: " + expressao;
        }
    }
}
