package com.gmail.namb1704836.ecommerce.dto;

import java.util.List;

import lombok.Data;

@Data
public class PerfumeSearchFilterDto {
	List<Integer> prices;
	List<String> perfumers;
	List<String> genders;
	String perfumeGender;
	String perfumer;
}
