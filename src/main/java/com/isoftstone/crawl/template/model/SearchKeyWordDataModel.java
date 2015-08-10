package com.isoftstone.crawl.template.model;

/**
 * 
 * 搜索关键字实体
 * */
public class SearchKeyWordDataModel implements Cloneable {
	private String id;
	private String sysId;
	private String sysName;
	private String userId;
	private String userName;
	private String tagId;
	private String tagName;
	private String tagType;
	private String engineNames;
	private String tagWords;
	private String state;
	private String createTime;
	private String stateDesc;
	private String typeName;

	public String getSysName() {
		return sysName;
	}
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public String getEngineNames() {
		return engineNames;
	}
	public void setEngineNames(String engineNames) {
		this.engineNames = engineNames;
	}
	public String getTagWords() {
		return tagWords;
	}
	public void setTagWords(String tagWords) {
		this.tagWords = tagWords;
	}

	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getStateDesc() {
		return stateDesc;
	}
	public void setStateDesc(String stateDesc) {
		this.stateDesc = stateDesc;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getSysId() {
		return sysId;
	}
	public void setSysId(String sysId) {
		this.sysId = sysId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getTagType() {
		return tagType;
	}
	public void setTagType(String tagType) {
		this.tagType = tagType;
	}
	public String getTagId() {
		return tagId;
	}
	public void setTagId(String tagId) {
		this.tagId = tagId;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	@Override  
    public Object clone()
    {  
		try{
			SearchKeyWordDataModel searchKeyWordDataModel = (SearchKeyWordDataModel) super.clone();        
	        return searchKeyWordDataModel;  
		}catch(CloneNotSupportedException e){
			e.printStackTrace();
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
    } 
}
