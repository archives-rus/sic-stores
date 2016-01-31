package ru.insoft.archive.sic.storages.repos;

import java.util.List;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;

public interface DescriptorValueRepo extends JpaRepository<DescriptorValue, Long> {

	@Cacheable("descriptors")
	@Override
	DescriptorValue findOne(Long id);

	List<DescriptorValue> findByGroupCode(@Param("code") String code);

	List<DescriptorValue> findByParent(@Param("parent") DescriptorValue parent);

	List<DescriptorValue> findByAttrDescriptor(@Param("code") String code);

	DescriptorValue findOneByCode(String code);
}
