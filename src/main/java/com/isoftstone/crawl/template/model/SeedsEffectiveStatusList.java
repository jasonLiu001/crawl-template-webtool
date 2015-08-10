package com.isoftstone.crawl.template.model;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

/**
 * 
 * 种子有效性View-Model
 * */
public class SeedsEffectiveStatusList {
	private List<SeedsEffectiveStatusModel> seedsEffectiveStatusList;

	public List<SeedsEffectiveStatusModel> getSeedsEffectiveStatusList() {
		return seedsEffectiveStatusList;
	}

	public void setSeedsEffectiveStatusList(List<SeedsEffectiveStatusModel> seedsEffectiveStatusList) {
		this.seedsEffectiveStatusList = seedsEffectiveStatusList;
	}
	
	public String toJSON() {
		String json = null;
		ObjectMapper objectmapper = new ObjectMapper();
		try {
			json = objectmapper.writeValueAsString(this);
		} catch (JsonGenerationException e) {			
			e.printStackTrace();
		} catch (JsonMappingException e) {			
			e.printStackTrace();
		} catch (IOException e) {			
			e.printStackTrace();
		}

		return json;		
	}
}
