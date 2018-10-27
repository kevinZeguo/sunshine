package com.beijing.geek.cms.sys.controller.common;

import com.alibaba.fastjson.JSONObject;
import com.beijing.geek.cms.sys.domain.common.AjaxJson;
import com.beijing.geek.cms.sys.domain.common.SysFile;
import com.beijing.geek.cms.sys.domain.user.CmsUser;
import com.beijing.geek.cms.sys.service.common.SysFileService;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * Created by mazeguo on 2017/6/10.
 */
@Controller
@RequestMapping("/file/")
public class FileController {
    private static final Logger logger = Logger.getLogger(FileController.class);

    @Autowired
    private SysFileService sysFileService;
    private static final String APP_TYPE = "app";

    @Value("${cms.sys.file.dir}")
    private String file_cm_dir;

    /**
     * 保存文件列表
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("saveFile.ajax")
    public AjaxJson saveFile(CmsUser user, @RequestParam("file") CommonsMultipartFile file, HttpServletRequest request, String appType) {
        //用来检测程序运行时间
        long startTime = System.currentTimeMillis();
        logger.debug("fileName：" + file.getOriginalFilename());
        SysFile sysFile = new SysFile();
        Integer fileId;
        AjaxJson ajaxJson = new AjaxJson();
        try {
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
            ajaxJson.setSuccess(Boolean.TRUE);
            ajaxJson.setObj(result);
            ajaxJson.setMsg("保存成功");
        } catch (FileNotFoundException e) {
            logger.error("未找到文件上传失败", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("未找到文件上传失败");
        } catch (IOException e) {
            logger.error("读取上传文件流失败", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("读取上传文件流失败");
        } catch (Exception e) {
            logger.error("保存失败!", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("保存失败");
        }
        long endTime = System.currentTimeMillis();
        logger.debug("保存文件的运行时间：" + String.valueOf(endTime - startTime) + "ms");
        return ajaxJson;
    }


    /**
     * 保存文件列表 V2
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("saveFile2.ajax")
    public AjaxJson saveFile2(CmsUser user, @RequestParam("file") CommonsMultipartFile file, HttpServletRequest request, String appType) {
        //用来检测程序运行时间
        long startTime = System.currentTimeMillis();
        logger.debug("fileName：" + file.getOriginalFilename());
        SysFile sysFile = new SysFile();
        Integer fileId;
        AjaxJson ajaxJson = new AjaxJson();
        try {
            if (StringUtil.isEmpty(appType)) {
                appType = APP_TYPE;
            }

            String dir;
            //文件存储路径
            String fileDir = file_cm_dir + File.separator;
            //文件夹
            dir = "upload" + File.separator + appType + File.separator;

            //判断文件夹是否存在不存在则创建
            File dirFile = new File(fileDir + File.separator + dir);
            if (!dirFile.exists()) {
                dirFile.mkdirs();
            }
            //文件名
            String fileName = file.getOriginalFilename();

            //文件别名
            DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
            String fileAlias = fileName + df.format(new Date());
            //转存文件
            file.transferTo(new File(fileDir + File.separator + dir + fileAlias));

            //保存完成后 ,存储文件信息
            sysFile.setAppType(appType);
            sysFile.setCreator(user.getUserId());
            sysFile.setFileAlias(fileAlias);
            sysFile.setFileDir(dir);
            sysFile.setFileName(fileName);
            sysFile.setFileSize(file.getSize());
            sysFile.setFileType(fileName.substring(fileName.lastIndexOf("."), fileName.length()));
            sysFileService.saveFile(sysFile);
            fileId = sysFile.getId();

            //处理成功
            ajaxJson.setSuccess(Boolean.TRUE);
            ajaxJson.setObj(fileId);
            ajaxJson.setObj("保存成功");
        } catch (FileNotFoundException e) {
            logger.error("未找到文件上传失败", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("未找到文件上传失败");
        } catch (IOException e) {
            logger.error("读取上传文件流失败", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("读取上传文件流失败");
        } catch (Exception e) {
            logger.error("保存失败!", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("保存失败");
        }
        long endTime = System.currentTimeMillis();
        logger.debug("方法一的运行时间：" + String.valueOf(endTime - startTime) + "ms");
        return ajaxJson;
    }

    /**
     * 保存文件列表 V2
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("saveFile3.ajax")
    public AjaxJson saveFile3(CmsUser user, HttpServletRequest request, String appType) {
        //用来检测程序运行时间
        long startTime = System.currentTimeMillis();
        SysFile sysFile = new SysFile();
        Integer fileId;
        AjaxJson ajaxJson = new AjaxJson();
        try {
            if (StringUtil.isEmpty(appType)) {
                appType = APP_TYPE;
            }

            String dir;
            //文件存储路径
            String fileDir = file_cm_dir + File.separator;
            //文件夹
            dir = "upload" + File.separator + appType + File.separator;

            //判断文件夹是否存在不存在则创建
            File dirFile = new File(fileDir + File.separator + dir);
            if (!dirFile.exists()) {
                dirFile.mkdirs();
            }

            List<Integer> fileIdList = new ArrayList<>();
            //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
            CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
            //检查form中是否有enctype="multipart/form-data"
            if (multipartResolver.isMultipart(request)) {
                //将request变成多部分request
                MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
                //获取multiRequest 中所有的文件名
                Iterator iter = multiRequest.getFileNames();

                //文件别名
                DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");

                while (iter.hasNext()) {
                    //一次遍历所有文件
                    MultipartFile file = multiRequest.getFile(iter.next().toString());
                    if (file != null) {
                        String fileName = file.getOriginalFilename();
                        String fileAlias = fileName + df.format(new Date());
                        //上传
                        file.transferTo(new File(fileDir + File.separator + dir + fileAlias));
                        //保存完成后 ,存储文件信息
                        sysFile.setAppType(appType);
                        sysFile.setCreator(user.getUserId());
                        sysFile.setFileAlias(fileAlias);
                        sysFile.setFileDir(dir);
                        sysFile.setFileName(fileName);
                        sysFile.setFileSize(file.getSize());
                        sysFile.setFileType(fileName.substring(fileName.lastIndexOf("."), fileName.length()));
                        sysFileService.saveFile(sysFile);
                        fileId = sysFile.getId();
                        fileIdList.add(fileId);
                    }

                }

            }


            //处理成功
            ajaxJson.setSuccess(Boolean.TRUE);
            ajaxJson.setObj(fileIdList);
            ajaxJson.setObj("保存成功");
        } catch (FileNotFoundException e) {
            logger.error("未找到文件上传失败", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("未找到文件上传失败");
        } catch (IOException e) {
            logger.error("读取上传文件流失败", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("读取上传文件流失败");
        } catch (Exception e) {
            logger.error("保存失败!", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("保存失败");
        }
        long endTime = System.currentTimeMillis();
        logger.debug("方法一的运行时间：" + String.valueOf(endTime - startTime) + "ms");
        return ajaxJson;
    }


    /**
     * 下载文件
     *
     * @param fileId
     * @param response
     */
    @RequestMapping("downLoad.html")
    public void downLoad(Integer fileId, HttpServletRequest request, HttpServletResponse response) {
        InputStream result = null;
        try {
            //根目录
            String fileDir = file_cm_dir + File.separator;

            SysFile sysFile = sysFileService.findFileById(fileId);
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


    /**
     * 下载模板文件
     *
     * @param fileName
     * @param response
     */
    @RequestMapping("downtemplate.html")
    public void downLoad(String fileName, HttpServletResponse response, HttpServletRequest request) {
        InputStream result = null;
        try {
            String fileDir = request.getSession().getServletContext().getRealPath(File.separator) + "download" + File.separator + "tmp" + File.separator;
            File tmpFile = new File(fileDir + fileName);
            //判断文件是否存在
            if (tmpFile.exists()) {  //文件存在
                // 设置反馈消息头
                response.setContentType("text/html;charset=utf-8");
                response.setContentType("application/x-msdownload;");
                response.setHeader("Content-disposition", "attachment; filename=" + fileName);
                FileInputStream inputStream = new FileInputStream(tmpFile);
                OutputStream stream = response.getOutputStream();
                int l = -1;
                byte[] tmp = new byte[1024];
                while ((l = inputStream.read(tmp)) != -1) {
                    // 文件流写出
                    stream.write(tmp, 0, l);
                    stream.flush();
                }
                stream.close();
            }

        } catch (Exception e) {
            logger.error("下载文件模板文件失败，模板文件名:" + fileName, e);
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


    /**
     * 查询文件列表
     *
     * @param fileIds
     * @return
     */
    @RequestMapping("findByIds.ajax")
    @ResponseBody
    public AjaxJson findByIds(String fileIds) {
        AjaxJson result = new AjaxJson();
        try {
            if ((StringUtils.isNotBlank(fileIds))) {
                List<Integer> fIds = new ArrayList<>();
                String[] ids = fileIds.split(",");
                for (String id : ids) {
                    fIds.add(Integer.parseInt(id));
                }
                List<SysFile> fileList = sysFileService.listFiles(fIds);
                result.setObj(fileList);
                result.setSuccess(true);
                return result;
            }
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("查询文件列表失败，  文件Id:" + fileIds, e);
            result.setMsg(e.getMessage());
            result.setSuccess(false);
        }
        return result;
    }

    /**
     * 查询文件列表
     *
     * @param appType
     * @param appId
     * @param fileIds
     * @return
     */
    @RequestMapping("fileList.ajax")
    @ResponseBody
    public AjaxJson fileList(String appType, Integer appId, String fileIds) {
        AjaxJson result = new AjaxJson();
        try {
            if ((StringUtils.isNotBlank(appType) && appId != null && appId > 0)) {
                List<SysFile> fileList = sysFileService.findListByAppIdAndType(appId, appType);
                result.setObj(fileList);
                result.setSuccess(true);
                return result;
            }

            if ((StringUtils.isNotBlank(fileIds))) {
                List<Integer> fIds = new ArrayList<>();
                String[] ids = fileIds.split(",");
                for (String id : ids) {
                    fIds.add(Integer.parseInt(id));
                }
                List<SysFile> fileList = sysFileService.listFiles(fIds);
                result.setObj(fileList);
                result.setSuccess(true);
                return result;
            }
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("查询文件列表失败，请求参数:" + appType + "  文件Id:" + fileIds, e);
            result.setMsg(e.getMessage());
            result.setSuccess(false);
        }
        return result;
    }


}
