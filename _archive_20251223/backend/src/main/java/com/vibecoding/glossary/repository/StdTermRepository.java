package com.vibecoding.glossary.repository;

import com.vibecoding.glossary.entity.StdTerm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface StdTermRepository extends JpaRepository<StdTerm, Long> {

    @Query("SELECT t FROM StdTerm t LEFT JOIN FETCH t.domain " +
            "WHERE t.logicalName LIKE %:keyword% OR t.physicalName LIKE %:keyword%")
    List<StdTerm> searchByKeyword(@Param("keyword") String keyword);
}
