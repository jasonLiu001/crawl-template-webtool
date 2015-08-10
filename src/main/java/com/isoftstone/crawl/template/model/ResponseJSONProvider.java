package com.isoftstone.crawl.template.model;

import java.io.IOException;

import com.alibaba.fastjson.JSON;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;


/**
 * 
 * restful接口响应对象
 * */
public class ResponseJSONProvider<T> {
	private boolean success;
	private String errorMsg;
	private String errorCode;
	private Integer total;  
    private T data;
	
	public String toJSON() {
		String json = null;
		//ObjectMapper objectmapper = new ObjectMapper();
		try {
			//json = objectmapper.writeValueAsString(this);
			json= JSON.toJSONString(this);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return json;		
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public boolean getSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

}
