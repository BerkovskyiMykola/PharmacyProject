using PharmacyProject.DTO;

namespace PharmacyProject.Services.Database
{
    public interface IDatabaseService
    {
        IEnumerable<BackupDTO> GetBackups();
        Task<BackupDTO> CreateBackupAsync();
        void DeleteBackup(string backupName);
        Task RestoreAsync(string backupName);
    }
}
