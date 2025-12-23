package com.vibecoding.glossary.dto;

import com.vibecoding.glossary.entity.StdTerm;
import lombok.Getter;

@Getter
public class TermRespDto {
    private Long termId;
    private String logicalName;
    private String physicalName;
    private String domainName;
    private String dataType;
    private Integer dataLength;

    public TermRespDto(StdTerm term) {
        this.termId = term.getTermId();
        this.logicalName = term.getLogicalName();
        this.physicalName = term.getPhysicalName();
        if (term.getDomain() != null) {
            this.domainName = term.getDomain().getDomainName();
            this.dataType = term.getDomain().getDataType();
            this.dataLength = term.getDomain().getDataLength();
        }
    }
}
