package ru.insoft.archive.sic.storages.repos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValueWithDescAttr;

public interface DescriptorValueWithDescAttrRepo extends JpaRepository<DescriptorValueWithDescAttr, Long> {

	List<DescriptorValueWithDescAttr> findByGroupWithGroupAttr(@Param("group") String group,
			@Param("attrGroup") String attrGroup);
}
