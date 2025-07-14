package com.sasinransara.io.support.repository;

import com.sasinransara.io.support.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    
    @Query("SELECT c.complaintNumber FROM Complaint c WHERE c.complaintNumber LIKE :prefix ORDER BY c.complaintNumber DESC LIMIT 1")
    String findLastComplaintNumberByPrefix(@Param("prefix") String prefix);

    @Query("SELECT c.complaintNumber FROM Complaint c ORDER BY c.id DESC LIMIT 1")
    String findLastComplaintNumber();
    
    boolean existsByComplaintNumber(String complaintNumber);
}