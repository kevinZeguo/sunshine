package com.beijing.geek.cms.sys.utils;


import com.beijing.geek.cms.sys.spring.ApplicationContextHolder;
import org.apache.log4j.Logger;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.ui.velocity.VelocityEngineFactoryBean;
import org.springframework.ui.velocity.VelocityEngineUtils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author 马泽国
 */
public class SendMailUtil {
    private static final Logger logger = Logger.getLogger(SendMailUtil.class);
    //private static final String smtphost = "192.168.1.70";
//    private static final String smtpHost = "smtp.126.com";
////        private static final String from = "soluxehotelniamey@126.com";
////    private static final String fromUserPassword = "20332222solux";
//    private static final String from = "xinzhong85@126.com";
//    private static final String fromUserPassword = "mzg_200491";

  private static final String smtpHost = "smtp.mxhichina.com";
  private static final String smtpPort = "25";
      private static final String from = "noreply@soluxehotelniamey.com";
  private static final String fromUserPassword = "Niamey1234";

    private static final String messageType = "text/html;charset=gb2312";
    private static Map<String, String> hostMap = new HashMap<String, String>();
    @Autowired
    private VelocityEngine velocityEngine;

//
//    static {
//        factoryBean = new VelocityEngineFactoryBean();
//        factoryBean.setResourceLoaderPath("/WEB-INF/mail/");
//        Properties pro = new Properties();
//        pro.setProperty("default.contentType", "text/html; charset=utf-8");
//        pro.setProperty("output.encoding", "utf-8");
//        pro.setProperty("input.encoding", "utf-8");
//        pro.setProperty("dateToolAttribute", "dateTool");
//        pro.setProperty("resource.loader", "class");
//        pro.setProperty("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
//        factoryBean.setVelocityProperties(pro);
//    }


    public static void sendMessage(String to, String subject, String messageText, String cc) throws MessagingException {
        logger.debug("===========================================================================================");
        logger.debug(messageText);
        // 第一步：配置javax.mail.Session对象
        logger.info("为" + smtpHost + "配置mail session对象");
        Properties props = new Properties();
//        props.put("mail.smtp.host", smtpHost);
//        props.put("mail.smtp.starttls.enable", "true");//使用 STARTTLS安全连接
//        //props.put("mail.smtp.port", "25");             //google使用465或587端口
//        props.put("mail.smtp.auth", "true");        // 使用验证
//        props.put("mail.debug", "false");
        
        props.put("mail.host", smtpHost);
//      props.put("mail.transort.protocol", "smtp");//使用 STARTTLS安全连接
//      props.put("mail.smtp.port", smtpPort);             //google使用465或587端口
      props.put("mail.smtp.auth", "true");        // 使用验证
//      props.put("mail.debug", "false");
        Session mailSession = Session.getInstance(props, new MyAuthenticator(from, fromUserPassword));
        // 第二步：编写消息
        logger.info("编写消息from——to:" + from + "——" + to);

        MimeMessage message = new MimeMessage(mailSession);

        InternetAddress fromAddress = new InternetAddress(from);
        message.setFrom(fromAddress);

        InternetAddress[] addressTo = new InternetAddress().parse(to);
        message.setRecipients(Message.RecipientType.TO, addressTo);
        if (StringUtil.isNotEmpty(cc)) {
            InternetAddress[] addressCC = new InternetAddress().parse(cc);
            message.setRecipients(Message.RecipientType.CC, addressCC);
        }

        message.setSentDate(Calendar.getInstance().getTime());
        message.setSubject(subject);
        message.setContent(messageText, messageType);

        // 第三步：发送消息
        Transport transport = mailSession.getTransport("smtp");
        transport.connect(smtpHost, from, fromUserPassword);
        transport.send(message, message.getAllRecipients());
//        if (StringUtil.isNotEmpty(cc)) {
//            transport.send(message, message.getRecipients(MimeMessage.RecipientType.CC));
//        }
        logger.info("message yes");
    }

    public static void sendMessage2(String to, String subject, String content, String cc) throws MessagingException {
        JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();
        // 设定mail server
        senderImpl.setHost("smtp.163.com");
        // 建立邮件消息
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        // 设置收件人，寄件人 用数组发送多个邮件
        // String[] array = new String[] {"sun111@163.com","sun222@sohu.com"};
        // mailMessage.setTo(array);
        mailMessage.setTo(to);
        mailMessage.setCc(cc);
        mailMessage.setFrom(from);
        mailMessage.setSubject(subject);
        mailMessage.setText(content);
        mailMessage.setSentDate(new Date());
        senderImpl.setPort(25);
        senderImpl.setUsername(from); // 根据自己的情况,设置username
        senderImpl.setPassword(fromUserPassword); // 根据自己的情况, 设置password
        senderImpl.setDefaultEncoding("UTF-8");
        Properties prop = new Properties();
//        prop.put("mail.smtp.auth", "true"); // 将这个参数设为true，让服务器进行认证,认证用户名和密码是否正确
        prop.put("mail.smtp.timeout", "25000");
        prop.put("mail.debug", "true");//便于调试
        prop.put("mail.transport.protocol", "smtp");
        /**
         * 关键代码，
         * 出现554 DT:SPM 163 smtp5,D9GowACHO7RNWNdXmXs1Bw--.9035S2 1473730639,
         * please see http://mail.163.com/help/help_spam_16.htm?ip=124.251.36.10
         * &hostid=smtp5&time=1473730639
         原因是：ip与域名不匹配。
         */
        prop.put("mail.smtp.localhost", "mail.126.com");
        prop.put("mail.smtp.auth", "false");
        prop.put("mail.smtp.port", "25");
        senderImpl.setJavaMailProperties(prop);
        // 发送邮件
        senderImpl.send(mailMessage);
        logger.info("message yes");
    }


    public static void main(String[] args) {
        try {
            SendMailUtil.sendMessage("121615715@qq.com", "测试邮件",
                    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "jackfeng86@163.com");
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}

class MyAuthenticator extends Authenticator {
    String userName = "";
    String password = "";

    public MyAuthenticator() {
    }

    public MyAuthenticator(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(userName, password);
    }
}