package com.beijing.geek.cms.sys.controller.api;

import com.beijing.geek.cms.sys.domain.common.ApiAjaxJson;
import com.beijing.geek.cms.sys.domain.common.SysFile;
import com.beijing.geek.cms.sys.domain.user.SysUser;
import com.beijing.geek.cms.sys.service.common.SysFileService;
import com.beijing.geek.cms.sys.service.user.UserService;
import com.beijing.geek.cms.sys.utils.CmsAjaxUtil;
import com.beijing.geek.cms.sys.utils.StringUtil;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/api/file/")
public class FileApiController {
    private static final Logger logger = Logger.getLogger(FileApiController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private SysFileService sysFileService;
    private static final String APP_TYPE = "app";
    @Value("${cms.sys.file.dir}")
    private String file_cm_dir;

    /**
     * 保存文件列表
     *
     * @param file
     * @param request
     * @param appType
     * @return
     */
    @ResponseBody
    @RequestMapping("saveFile.ajax")
    public JSONObject saveFile(@RequestParam("file") CommonsMultipartFile file, String body, HttpServletRequest request, String appType) {
        //用来检测程序运行时间
        long startTime = System.currentTimeMillis();
        logger.debug("fileName：" + file.getOriginalFilename());
        SysFile sysFile = new SysFile();
        Integer fileId;
        ApiAjaxJson resultJson = new ApiAjaxJson();
        try {
            //封装查询参数
            SysFile param = (SysFile) JSONObject.toBean(JSONObject.fromObject(body), SysFile.class);
            if (StringUtil.isEmpty(param.getUserKey())) {
                throw new Exception("用户Key为空，不能保存文件信息");
            }
            //根据用户Key查询用户信息
            SysUser user = userService.findUserByUserKey(param.getUserKey());
            if (user == null) {
                throw new Exception("用户Key无效，不能保存文件信息");
            }
            if (param.getAppType() == null) {
                throw new Exception("文件类型为空，不能保存文件信息");
            }

            if (StringUtil.isEmpty(appType)) {
                appType = APP_TYPE;
            }
            String dir;
            //文件存储路径
            String fileDir = file_cm_dir + File.separator;
            //文件夹
            dir = "upload" + File.separator + appType + File.separator;

            //文件名
            String fileName = file.getOriginalFilename();

            //文件别名
            DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
            String fileAlias = fileName + df.format(new Date());

            //判断文件夹是否存在不存在则创建
            File dirFile = new File(fileDir + File.separator + dir);
            if (!dirFile.exists()) {
                dirFile.mkdirs();
            }

            //获取输出流
            OutputStream os = new FileOutputStream(fileDir + File.separator + dir + fileAlias);
            //获取输入流 CommonsMultipartFile 中可以直接得到文件的流
            InputStream is = file.getInputStream();
            int temp;
            //一个一个字节的读取并写入
            while ((temp = is.read()) != (-1)) {
                os.write(temp);
            }
            os.flush();
            os.close();
            is.close();

            //保存完成后 ,存储文件信息
            sysFile.setAppType(appType);
            sysFile.setCreator(user.getUserId());
            sysFile.setFileAlias(fileAlias);
            sysFile.setFileDir(dir);
            sysFile.setFileName(fileName);
            sysFile.setFileSize(file.getSize());
//            sysFile.setFileType(fileName.substring(fileName.lastIndexOf("."), fileName.length()));
            sysFileService.saveFile(sysFile);
            fileId = sysFile.getId();
            JSONObject result = new JSONObject();
            result.put("fileId", fileId);
            result.put("fileName", fileName);
            //处理成功
            resultJson.setSuccess(Boolean.TRUE);
            resultJson.setObj(result);
            resultJson.setMessage("保存成功");
            resultJson.setCode(0);
        } catch (FileNotFoundException e) {
            logger.error("未找到文件上传失败", e);
            resultJson.setSuccess(Boolean.FALSE);
            resultJson.setObj("未找到文件上传失败");
            resultJson.setCode(-3);

        } catch (IOException e) {
            logger.error("读取上传文件流失败", e);
            resultJson.setSuccess(Boolean.FALSE);
            resultJson.setObj("读取上传文件流失败");
            resultJson.setCode(-2);

        } catch (Exception e) {
            logger.error("保存失败!", e);
            resultJson.setSuccess(Boolean.FALSE);
            resultJson.setObj("保存失败");
            resultJson.setCode(-1);

        }
        long endTime = System.currentTimeMillis();
        logger.debug("保存文件的运行时间：" + String.valueOf(endTime - startTime) + "ms");
        return CmsAjaxUtil.apiToJSON(resultJson);
    }

    /**
     * 下载文件
     *
     * @param response
     */
    @ResponseBody
    @RequestMapping(value = "download.ajax", method = RequestMethod.GET)
    public void downLoad(String body, HttpServletRequest request, HttpServletResponse response) {
        InputStream result = null;
        try {
            //封装查询参数
            SysFile param = (SysFile) JSONObject.toBean(JSONObject.fromObject(body), SysFile.class);
            if (StringUtil.isEmpty(param.getUserKey())) {
                throw new Exception("用户Key为空，不能保存文件信息");
            }

            //根据用户Key查询用户信息
            SysUser user = userService.findUserByUserKey(param.getUserKey());
            if (user == null) {
                throw new Exception("用户Key无效，不能保存文件信息");
            }

            //根目录
            String fileDir = file_cm_dir + File.separator;

            SysFile sysFile = sysFileService.findFileById(param.getId());
            String appType = sysFile.getAppType();
            if (sysFile != null) {//文件定义存在
                if (StringUtil.isEmpty(appType)) {
                    appType = APP_TYPE;
                }
                //根据文件定义查找文件位置
                File file = new File(fileDir + File.separator + sysFile.getFileDir() + File.separator + sysFile.getFileAlias());
                if (file.exists()) {  //文件存在
                    // 设置反馈消息头
                    response.setContentType("text/html;charset=utf-8");
                    response.setContentType("application/x-msdownload;");
                    response.setHeader("Content-disposition", "attachment; filename=" + new String(sysFile.getFileName().getBytes("utf-8"), "ISO8859-1"));
//                    response.setHeader("Content-Length", String.valueOf(sysFile.getFileSize()));
                    OutputStream stream = response.getOutputStream();
                    result = new FileInputStream(file);

                    int l = -1;
                    byte[] tmp = new byte[1024];
                    while ((l = result.read(tmp)) != -1) {
                        // 文件流写出
                        stream.write(tmp, 0, l);
                        stream.flush();
                    }
                    stream.close();
                }

            }
        } catch (Exception e) {
            logger.error("下载文件操作失败！", e);
        } finally {
            if (result != null) {
                try {
                    result.close();
                } catch (Exception e) {
                    logger.error("input 输入流关闭失败", e);
                }
            }
        }
    }


}
